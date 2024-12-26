"use server"

import db from "@/db"
import { meetings } from "@/db/schema/meetings"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function updateMeetingTitle(
  meetingId: string,
  formData: FormData
) {
  const title = formData.get("title") as string

  if (!title) {
    throw new Error("Missing required field")
  }

  await db
    .update(meetings)
    .set({ title: title })
    .where(eq(meetings.id, meetingId))

  revalidatePath(`/meetings/${meetingId}`)
}
