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

  const never: string[] = []
  const modifiable: string[] = []

  for (let i = 0; i < scheduleList.length; i++) {
    if (scheduleList[i].type === "never") {
      never.push(scheduleList[i].date.toDateString())
    } else {
      modifiable.push(scheduleList[i].date.toDateString())
    }
  }

  return (
    <div
      className={
        "w-[90vw] snap-center grid grid-cols-7 bg-white rounded-xl p-2"
      }
    >
      {dayList.map((day, i) => (
        <div
          key={i}
          className={`text-center text-xs flex flex-col items-center justify-center ${i == 0 && "text-red-500"}  ${i == 6 && "text-blue-500"}`}
        >
          <p>
            {day.date.getMonth() + 1}/{day.date.getDate()}
          </p>
          <p>{getKorDay(day.date.getDay())}</p>
        </div>
      ))}
      {dateList.map((date, i) => (
        <div
          key={i}
          className={`w-full h-full text-xs transition-all flex justify-center items-center border-[1px] ${
            never.includes(date.toDateString())
              ? "never-time"
              : modifiable.includes(date.toDateString())
                ? "modifiable-time"
                : dayList[date.getDay()].isAvailable
                  ? "bg-white text-neutral-700 border-neutral-200"
                  : "disabled-time"
          }
          `}
        >
          {fixStringLength(String(date.getHours()), 2, "0")}:
          {fixStringLength(String(date.getMinutes()), 2, "0")}
        </div>
      ))}
    </div>
  )
}
