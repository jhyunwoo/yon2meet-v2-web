"use server"

import db from "@/db"
import { schedules } from "@/db/schema/schedules"
import { auth } from "@/auth"
import { and, eq, inArray } from "drizzle-orm"
import { redirect } from "next/navigation"
import getMeetingData from "@/lib/get-metting-data"
import timeList from "@/app/components/drag-to-select/time-list"
import { addDays, addHours, addMinutes } from "date-fns"

export async function addScheduleAction(
  meetingId: string,
  never: string[],
  modifiable: string[]
) {
  const session = await auth()

  if (!session?.user?.id) {
    return
  }

  const dateList = [
    ...never.map((data) => new Date(data)),
    ...modifiable.map((data) => new Date(data)),
  ]

  await db
    .delete(schedules)
    .where(
      and(
        eq(schedules.userId, session.user.id),
        inArray(schedules.date, dateList)
      )
    )

  const meetingData = await getMeetingData(meetingId)

  const neverData: (typeof schedules.$inferInsert)[] = []
  const modifiableData: (typeof schedules.$inferInsert)[] = []

  const emptyDate: Date[] = []

  for (const data of never) {
    const date = new Date(data)
    if (date >= meetingData.startDate && date <= meetingData.endDate) {
      neverData.push({
        userId: session.user.id,
        date: new Date(data),
        type: "never",
      })
    }
  }
  for (const data of modifiable) {
    const date = new Date(data)
    if (date >= meetingData.startDate || date <= meetingData.endDate) {
      modifiableData.push({
        userId: session.user.id,
        date: new Date(data),
        type: "modifiable",
      })
    }
  }

  let indexDate = meetingData.startDate

  while (indexDate <= meetingData.endDate) {
    for (const time of timeList) {
      const hour = Number(time.split(":")[0])
      const minute = Number(time.split(":")[1])
      const targetDate = addMinutes(addHours(indexDate, hour), minute)
      if (
        !never.includes(targetDate.toJSON()) &&
        !modifiable.includes(targetDate.toJSON())
      ) {
        emptyDate.push(targetDate)
      }
    }
    indexDate = addDays(indexDate, 1)
  }

  if (neverData.length > 0) await db.insert(schedules).values(neverData)
  if (modifiableData.length > 0)
    await db.insert(schedules).values(modifiableData)
  if (emptyDate.length > 0)
    await db
      .delete(schedules)
      .where(
        and(
          eq(schedules.userId, session.user.id),
          inArray(schedules.date, emptyDate)
        )
      )

  redirect(`/meetings/${meetingId}`)
}
