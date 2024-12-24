import { redirect } from "next/navigation"
import { updateMeetingTitle } from "@/app/meetings/[meetingId]/actions"
import MeetingTitle from "@/app/meetings/[meetingId]/meeting-title"
import getMeetingData from "@/lib/get-metting-data"
import SchedulesList from "@/app/meetings/[meetingId]/schedules-list"

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ meetingId: string }>
}) {
  const { meetingId } = await params

  const meetingData = await getMeetingData(meetingId)

  // Meeting Data를 찾을 수 없을 시 Not Found로 이동
  if (!meetingData) {
    redirect("/not-found")
  }

  // action 에 meeting ID 추가 전달을 위한 Form Data
  const meetingIdFormData = new FormData()
  meetingIdFormData.set("id", meetingId)

  const updateMeetingTitleWithId = updateMeetingTitle.bind(
    null,
    meetingIdFormData
  )

  return (
    <div className={"w-full h-screen flex flex-col pb-20"}>
      <form
        className={"flex items-center gap-2 w-full p-4 bg-neutral-100"}
        action={updateMeetingTitleWithId}
      >
        <MeetingTitle title={meetingData.title} />
      </form>
      <div className={"flex snap-x overflow-x-auto overflow-y-hidden h-full"}>
        <SchedulesList meetingId={meetingId} />
      </div>
    </div>
  )
}
