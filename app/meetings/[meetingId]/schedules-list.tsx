import getMeetingSchedules from "@/lib/get-meeting-schedules"
import db from "@/db"
import { meetings } from "@/db/schema/meetings"
import { eq } from "drizzle-orm"
import WeekSchedule from "@/app/meetings/[meetingId]/week-schedule"
import createWeek from "@/lib/create-week"

export default async function SchedulesList({
  meetingId,
}: {
  meetingId: string
}) {
  const meetingData = (
    await db
      .select({
        startDate: meetings.startDate,
        endDate: meetings.endDate,
        title: meetings.title,
      })
      .from(meetings)
      .where(eq(meetings.id, meetingId))
      .limit(1)
  )[0]

  const schedules = await getMeetingSchedules(meetingId)

  const weekDataList = createWeek(meetingData.startDate, meetingData.endDate)

  return (
    <div className={"whitespace-nowrap flex gap-4 px-4 h-full"}>
      {weekDataList.map((week, i) => (
        <WeekSchedule dayList={week} scheduleList={schedules} key={i} />
      ))}
    </div>
  )
}
