import { redirect } from "next/navigation"
import { updateMeetingTitle } from "@/app/meetings/[meetingId]/actions"
import MeetingTitle from "@/app/meetings/[meetingId]/meeting-title"
import getMeetingData from "@/lib/get-metting-data"
import SchedulesList from "@/app/meetings/[meetingId]/schedules-list"
import getMeetingSchedules from "@/lib/get-meeting-schedules"
import ClearMeetingStartEnd from "@/app/meetings/[meetingId]/clear-meeting-start-end"
import { auth } from "@/auth"
import db from "@/db"
import { usersToMeetings } from "@/db/schema/users-to-meetings"
import { and, eq } from "drizzle-orm"

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ meetingId: string }>
}) {
  const { meetingId } = await params
  const [meetingData, schedules] = await Promise.all([
    getMeetingData(meetingId),
    getMeetingSchedules(meetingId),
  ])

  // Meeting Data를 찾을 수 없을 시 Not Found로 이동
  if (!meetingData) {
    redirect("/not-found")
  }

  const session = await auth()

  // Connect User to Meeting
  if (session?.user?.id) {
    const findUsersToMeeting = await db
      .select()
      .from(usersToMeetings)
      .where(
        and(
          eq(usersToMeetings.userId, session?.user?.id),
          eq(usersToMeetings.meetingId, meetingId)
        )
      )
    if (findUsersToMeeting.length === 0) {
      await db
        .insert(usersToMeetings)
        .values({ userId: session.user.id, meetingId: meetingId })
    }
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
