import DefaultLayout from "@/app/components/default-layout"
import DragToSelect from "@/app/components/drag-to-select"
import getMeetingData from "@/lib/get-metting-data"

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ meetingId: string }>
}) {
  const { meetingId } = await params
  const meetingData = await getMeetingData(meetingId)

  return <DefaultLayout></DefaultLayout>
}
