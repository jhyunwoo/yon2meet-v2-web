import { redirect } from "next/navigation"
import { updateMeetingTitle } from "@/app/meetings/[meetingId]/actions"
import MeetingTitle from "@/app/meetings/[meetingId]/meeting-title"
import getMeetingData from "@/lib/get-metting-data"
import SchedulesList from "@/app/meetings/[meetingId]/schedules-list"
import Link from "next/link"
import ShareButton from "@/app/meetings/[meetingId]/share-button"

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
    <div className={"w-full min-h-screen flex flex-col pb-20"}>
      <form
        className={"flex items-center gap-2 w-full p-4 bg-neutral-100"}
        action={updateMeetingTitleWithId}
      >
        <MeetingTitle title={meetingData.title} />
      </form>
      <div className={"flex items-center justify-around gap-2 w-full px-4"}>
        <Link
          href={`/meetings/${meetingId}/schedule`}
          className={"p-2 rounded-xl w-2/3 bg-sky-600 text-white text-center"}
        >
          스케줄 추가
        </Link>
        <ShareButton meetingId={meetingId} />
      </div>
      <div className={"flex snap-x overflow-x-auto overflow-y-hidden h-full"}>
        <SchedulesList meetingId={meetingId} />
      </div>
    </div>
  )
}
