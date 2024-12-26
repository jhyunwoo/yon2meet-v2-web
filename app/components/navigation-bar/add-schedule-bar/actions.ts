"use server"

import db from "@/db"
import { schedules } from "@/db/schema/schedules"
import { auth } from "@/auth"
import { and, eq, inArray } from "drizzle-orm"
import { redirect } from "next/navigation"
import getMeetingData from "@/lib/get-metting-data"

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

  if (neverData.length > 0) await db.insert(schedules).values(neverData)
  if (modifiableData.length > 0)
    await db.insert(schedules).values(modifiableData)

  redirect(`/meetings/${meetingId}`)
}
