import db from '@/db'
import { eq } from 'drizzle-orm'
import { meetings } from '@/db/schema/meetings'
import { redirect } from 'next/navigation'
import { updateMeetingTitle } from '@/app/meetings/[meetingId]/actions'
import MeetingTitle from '@/app/meetings/[meetingId]/meeting-title'

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ meetingId: string }>
}) {
  const { meetingId } = await params
  try {
    const meetingData = (
      await db
        .select()
        .from(meetings)
        .where(eq(meetings.id, meetingId))
        .limit(1)
    )[0]

    const meetingIdFormData = new FormData()
    meetingIdFormData.set('id', meetingId)

    const updateMeetingTitleWithId = updateMeetingTitle.bind(
      null,
      meetingIdFormData
    )

    return (
      <div className={'w-screen h-screen flex flex-col pb-20'}>
        <form
          className={'flex items-center gap-2 w-full p-4 bg-neutral-100'}
          action={updateMeetingTitleWithId}
        >
          <MeetingTitle title={meetingData.title} />
        </form>
        <div>{meetingData.startDate.toDateString()}</div>
        <div>{meetingData.endDate.toDateString()}</div>
      </div>
    )
  } catch {
    redirect('/not-found')
  }
}
