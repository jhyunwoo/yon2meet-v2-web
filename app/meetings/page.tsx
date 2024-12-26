import Header from "@/app/components/header"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import db from "@/db"
import { desc, eq } from "drizzle-orm"
import { usersToMeetings } from "@/db/schema/users-to-meetings"
import { meetings } from "@/db/schema/meetings"
import Link from "next/link"

export default async function MeetingsPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/profile")
  }

  const userMeetings = await db
    .select({
      meetingId: meetings.id,
      title: meetings.title,
      startDate: meetings.startDate,
      endDate: meetings.endDate,
    })
    .from(meetings)
    .innerJoin(usersToMeetings, eq(meetings.id, usersToMeetings.meetingId))
    .where(eq(usersToMeetings.userId, session.user.id))
    .orderBy(desc(meetings.createdAt))

  return (
    <div className={"w-screen min-h-screen flex flex-col pb-24 pt-16 px-4"}>
      <Header>내 미팅</Header>
      <div className={"w-full flex flex-col gap-2"}>
        {userMeetings.map((meeting, i) => (
          <Link
            href={`https://yon2meet.moveto.kr/meetings/${meeting.meetingId}`}
            className={"p-2 rounded-xl bg-white"}
            key={i}
          >
            <p className={"text-lg font-semibold"}>{meeting.title}</p>
            <p className={"text-sm"}>
              {Intl.DateTimeFormat("ko-KR", {
                year: "numeric",
                day: "numeric",
                month: "numeric",
              }).format(meeting.startDate)}{" "}
              -{" "}
              {Intl.DateTimeFormat("ko-KR", {
                year: "numeric",
                day: "numeric",
                month: "numeric",
              }).format(meeting.endDate)}
            </p>
          </Link>
        ))}
        {userMeetings.length === 0 && (
          <div className={"mx-auto"}>아직 생성된 미팅이 없습니다!</div>
        )}
      </div>
    </div>
  )
}
