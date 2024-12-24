'use server'

import db from '@/db'
import { meetings } from '@/db/schema/meetings'
import { redirect } from 'next/navigation'

export async function createMeeting(formData: FormData) {
  const startDate = formData.get('start') as string
  const endDate = formData.get('end') as string

  console.log(new Date(startDate), new Date(endDate))

  if (!startDate || !endDate) {
    throw new Error()
  }

  const createMeeting = await db
    .insert(meetings)
    .values({ startDate: new Date(startDate), endDate: new Date(endDate) })
    .returning({ id: meetings.id })

  redirect(`/meetings/${createMeeting[0].id}`)
}
