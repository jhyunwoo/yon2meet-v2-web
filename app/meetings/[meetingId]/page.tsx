import { redirect } from "next/navigation"
import { updateMeetingTitle } from "@/app/meetings/[meetingId]/actions"
import MeetingTitle from "@/app/meetings/[meetingId]/meeting-title"
import getMeetingData from "@/lib/get-metting-data"
import SchedulesList from "@/app/meetings/[meetingId]/schedules-list"
import getMeetingSchedules from "@/lib/get-meeting-schedules"
import ClearMeetingStartEnd from "@/app/meetings/[meetingId]/clear-meeting-start-end"

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ meetingId: string }>
}) {
  const { meetingId } = await params

  const meetingData = await getMeetingData(meetingId)
  const schedules = await getMeetingSchedules(meetingId)

  // Meeting Data를 찾을 수 없을 시 Not Found로 이동
  if (!meetingData) {
    redirect("/not-found")
  }

  const updateMeetingTitleWithId = updateMeetingTitle.bind(null, meetingId)

  return (
    <div className={"w-full h-screen flex flex-col pb-24"}>
      <form
        className={"flex items-center gap-2 w-full p-4 bg-neutral-100"}
        action={updateMeetingTitleWithId}
      >
        <MeetingTitle title={meetingData.title} />
      </form>
      <div className={"flex snap-x overflow-x-auto overflow-y-auto h-full"}>
        <SchedulesList
          meetingId={meetingId}
          meetingData={meetingData}
          schedules={schedules}
        />
      </div>
      <ClearMeetingStartEnd />
    </div>
  )
}
