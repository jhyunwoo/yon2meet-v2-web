"use server"

import db from "@/db"
import { meetings } from "@/db/schema/meetings"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { usersToMeetings } from "@/db/schema/users-to-meetings"

export async function createMeeting(formData: FormData) {
  const startDate = formData.get("start") as string
  const endDate = formData.get("end") as string

  const session = await auth()

  if (!startDate || !endDate || !session?.user?.id) {
    throw new Error("Invalid form data")
  }

  const createMeeting = (
    await db
      .insert(meetings)
      .values({ startDate: new Date(startDate), endDate: new Date(endDate) })
      .returning({ id: meetings.id })
  )[0]

  // Connect the user to the meeting
  await db
    .insert(usersToMeetings)
    .values({ userId: session.user.id, meetingId: createMeeting.id })

  redirect(`/meetings/${createMeeting.id}`)
}
