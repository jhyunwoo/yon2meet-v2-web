import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { addDays, addHours, addMinutes } from "date-fns"
import korDateToIndex from "@/lib/kor-date-to-index"
import db from "@/db"
import { schedules } from "@/db/schema/schedules"
import { and, eq, inArray } from "drizzle-orm"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const body = (await request.json()) as {
    schedule: {
      day: string
      fill_ratio: number
      time: string
      x: number
      y: number
    }[]
    timetable: {
      title: string
      start: string
      end: string
    }
  }

  const dateList: Date[] = []
  const neverDate: Date[] = []

  let indexDate = new Date(body.timetable.start)

  while (indexDate <= new Date(body.timetable.end)) {
    dateList.push(indexDate)
    indexDate = addDays(indexDate, 1)
  }

  for (const date of dateList) {
    for (const schedule of body.schedule) {
      const day = korDateToIndex(schedule.day)
      if (day === date.getDay() - 1) {
        const hour =
          parseInt(schedule.time.split(":")[0]) > 9
            ? parseInt(schedule.time.split(":")[0]) - 4
            : parseInt(schedule.time.split(":")[0]) + 8
        const scheduleDate = addHours(date, hour)
        neverDate.push(scheduleDate)
        neverDate.push(addMinutes(scheduleDate, 30))
      }
    }
  }

  const insertData: (typeof schedules.$inferInsert)[] = []

  await db
    .delete(schedules)
    .where(
      and(
        eq(schedules.userId, session.user.id),
        inArray(schedules.date, neverDate)
      )
    )

  for (const date of neverDate) {
    insertData.push({
      date: date,
      type: "never",
      userId: session.user.id,
    })
  }

  await db.insert(schedules).values(insertData)

  return NextResponse.json({ message: "Success" })
}
