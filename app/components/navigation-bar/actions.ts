'use server'

export async function createMeeting(formData: FormData) {
  console.log(formData.get('start'), formData.get('end'))
}
