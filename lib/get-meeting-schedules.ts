import db from "@/db"
import { meetings } from "@/db/schema/meetings"
import { eq } from "drizzle-orm"

export interface ScheduleType {
  userId: string
  userName: string
  type: "never" | "modifiable"
  date: Date
}

export default async function getMeetingSchedules(meetingId: string) {
  const meetingSchedules = await db.query.meetings.findFirst({
    where: eq(meetings.id, meetingId),
    with: {
      usersToMeetings: {
        with: {
          user: {
            with: {
              schedules: true,
            },
            columns: {
              id: true,
              name: true,
            },
          },
        },
        columns: {
          userId: false,
          meetingId: false,
        },
      },
    },
  })

  const schedules: ScheduleType[] = []

  if (!meetingSchedules) {
    return []
  }

  if (meetingSchedules.usersToMeetings.length > 0) {
    for (const user of meetingSchedules.usersToMeetings) {
      const userData = user.user

      for (const schedule of userData.schedules) {
        schedules.push({
          userId: userData.id,
          userName: userData.name!,
          type: schedule.type,
          date: schedule.date,
        })
      }
    }
  }
  return schedules
}
