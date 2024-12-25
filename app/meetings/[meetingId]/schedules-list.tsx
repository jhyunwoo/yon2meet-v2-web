"use client"

import WeekSchedule from "@/app/meetings/[meetingId]/week-schedule"
import createWeek from "@/lib/create-week"
import { ScheduleType } from "@/lib/get-meeting-schedules"

export default function SchedulesList({
  meetingData,
  schedules,
}: {
  meetingId: string
  meetingData: { id: string; title: string; startDate: Date; endDate: Date }
  schedules: ScheduleType[]
}) {
  const weekDataList = createWeek(meetingData.startDate, meetingData.endDate)

  return (
    <div className={"whitespace-nowrap flex gap-4 px-4 h-full"}>
      {weekDataList.map((week, i) => (
        <WeekSchedule dayList={week} scheduleList={schedules} key={i} />
      ))}
    </div>
  )
}
