import db from "@/db"
import { eq } from "drizzle-orm"
import { schedules } from "@/db/schema/schedules"
import { ScheduleType } from "@/lib/get-meeting-schedules"
import { auth } from "@/auth"

export default async function getUserSchedule(): Promise<ScheduleType[]> {
  const session = await auth()
  if (!session?.user?.id) return []

  const userSchedules = await db
    .select({ date: schedules.date, type: schedules.type })
    .from(schedules)
    .where(eq(schedules.userId, session?.user?.id))

  const scheduleList: ScheduleType[] = []
  for (const schedule of userSchedules) {
    scheduleList.push({
      userId: session.user.id,
      userName: session.user.name!,
      type: schedule.type,
      date: schedule.date,
    })
  }

  return scheduleList
}
