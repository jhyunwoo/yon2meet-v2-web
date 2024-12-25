import getMeetingData from "@/lib/get-metting-data"
import SelectSchedule from "@/app/meetings/[meetingId]/schedule/select-schedule"
import getMeetingSchedules from "@/lib/get-meeting-schedules"

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ meetingId: string }>
}) {
  const { meetingId } = await params
  const meetingData = await getMeetingData(meetingId)
  const schedules = await getMeetingSchedules(meetingId)

  return (
    <div className={"w-screen h-screen flex flex-col pb-20 p-2"}>
      <div
        className={
          "w-full grid grid-cols-2 gap-2 bg-white rounded-xl p-2 px-4 text-sm justify-items-start"
        }
      >
        <div className={"flex items-center justify-center gap-2"}>
          <div className={"size-4 rounded-full bg-sky-800"} />
          <p>조정 불가한 시간</p>
        </div>
        <div className={"flex items-center justify-center gap-2"}>
          <div className={"size-4 rounded-full bg-sky-500"} />
          <p>조정 가능한 시간</p>
        </div>
      </div>
      <SelectSchedule
        startDate={meetingData.startDate}
        endDate={meetingData.endDate}
        schedules={schedules}
      />
    </div>
  )
}
