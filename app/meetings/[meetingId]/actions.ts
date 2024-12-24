'use server'

import db from '@/db'
import { meetings } from '@/db/schema/meetings'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function updateMeetingTitle(
  meetingId: FormData,
  formData: FormData
) {
  const title = formData.get('title') as string
  const id = meetingId.get('id') as string

  if (!title) {
    throw new Error('Missing required field')
  }

  await db.update(meetings).set({ title: title }).where(eq(meetings.id, id))
  revalidatePath(`/meetings/${id}`)
}
