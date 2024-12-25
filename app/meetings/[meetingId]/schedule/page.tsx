import DragToSelect from "@/app/components/drag-to-select"
import getMeetingData from "@/lib/get-metting-data"
import createWeek from "@/lib/create-week"
import Header from "@/app/components/header"

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ meetingId: string }>
}) {
  const { meetingId } = await params
  const meetingData = await getMeetingData(meetingId)
  const weekDataList = createWeek(meetingData.startDate, meetingData.endDate)

  return (
    <div className={"w-screen min-h-screen flex flex-col pb-20 pt-16 p-4"}>
      <Header>스케줄 추가</Header>
      <div
        className={
          "w-full grid grid-cols-2 gap-2 bg-white rounded-xl p-2 px-4 text-sm justify-items-start"
        }
      >
        <div className={"flex items-center justify-center gap-2"}>
          <div className={"size-4 rounded-full bg-sky-500"} />
          <p>조정 불가한 시간</p>
        </div>
        <div className={"flex items-center justify-center gap-2"}>
          <div className={"size-4 rounded-full bg-sky-800"} />
          <p>조정 가능한 시간</p>
        </div>
      </div>
      <div
        className={
          "flex snap-x overflow-x-auto overflow-y-hidden h-full w-full"
        }
      >
        <div className={"whitespace-nowrap flex gap-4 px-4 h-full"}>
          {weekDataList.map((week, i) => (
            <DragToSelect key={i} dayList={week} />
          ))}
        </div>
      </div>
    </div>
  )
}
