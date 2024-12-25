"use client"

import getMeetingSchedules from "@/lib/get-meeting-schedules"
import WeekSchedule from "@/app/meetings/[meetingId]/week-schedule"
import createWeek from "@/lib/create-week"

export default async function SchedulesList({
  meetingId,
  meetingData,
}: {
  meetingId: string
  meetingData: { id: string; title: string; startDate: Date; endDate: Date }
}) {
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
