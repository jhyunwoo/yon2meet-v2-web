import { DayListType } from "@/lib/create-day-list"
import { ScheduleType } from "@/lib/get-meeting-schedules"
import createDateList from "@/app/components/drag-to-select/create-date-list"
import getKorDay from "@/lib/get-kor-day"
import fixStringLength from "@/lib/fix-string-length"

export default function WeekSchedule({
  dayList,
  scheduleList,
}: {
  dayList: DayListType[]
  scheduleList: ScheduleType[]
}) {
  const dateList: Date[] = createDateList(dayList)

  const never: number[] = []
  const modifiable: number[] = []

  for (let i = 0; i < scheduleList.length; i++) {
    if (scheduleList[i].type === "never") {
      never.push(i)
    } else {
      modifiable.push(i)
    }
  }

  return (
    <div className={"w-96 snap-center grid grid-cols-7 bg-white rounded-xl"}>
      {dayList.map((day, i) => (
        <div key={i} className={"text-center text-sm"}>
          {getKorDay(day.date.getDay())}
        </div>
      ))}
      {dateList.map((date, i) => (
        <div
          key={i}
          className={`w-full h-full text-xs transition-all flex justify-center items-center border-[1px] ${
            never.includes(i)
              ? "bg-green-500 text-white border-green-500"
              : modifiable.includes(i)
                ? "bg-green-800 text-white border-green-800"
                : "bg-white text-neutral-700 border-neutral-200"
          }`}
        >
          {fixStringLength(String(date.getHours()), 2, "0")}:
          {fixStringLength(String(date.getMinutes()), 2, "0")}
        </div>
      ))}
    </div>
  )
}
