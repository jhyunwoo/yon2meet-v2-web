import DefaultLayout from "@/app/components/default-layout"
import Header from "@/app/components/header"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function MeetingsPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/profile")
  }

  // const meetingData = await db.query.meetings.findMany({
  //   with: {
  //     usersToMeetings: {
  //       where: eq(usersToMeetings.userId, session.user.id),
  //     },
  //   },
  // })
  return (
    <DefaultLayout>
      <Header>내 미팅</Header>
      <div>Meetings Page</div>
    </DefaultLayout>
  )
}
