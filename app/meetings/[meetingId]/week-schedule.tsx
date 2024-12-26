import { DayListType } from "@/lib/create-day-list"
import { ScheduleType } from "@/lib/get-meeting-schedules"
import createDateList from "@/app/components/drag-to-select/create-date-list"

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
      never.push(scheduleList[i].date.toJSON())
    } else {
      modifiable.push(scheduleList[i].date.toJSON())
    }
  }

  for (const neverSchedule of never) {
    if (modifiable.includes(neverSchedule)) {
      modifiable.splice(modifiable.indexOf(neverSchedule), 1)
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
            {Intl.DateTimeFormat("ko-KR", {
              day: "numeric",
              month: "numeric",
            }).format(day.date)}
          </p>
          <p>
            {Intl.DateTimeFormat("ko-KR", {
              weekday: "short",
            }).format(day.date)}
          </p>
        </div>
      ))}
      {dateList.map((date, i) => (
        <div
          key={i}
          className={`w-full h-full text-xs transition-all flex justify-center items-center border-[1px] ${
            dayList[dateList[i].getDay()].isAvailable
              ? never.includes(dateList[i].toJSON())
                ? "never-time"
                : modifiable.includes(dateList[i].toJSON())
                  ? "modifiable-time"
                  : "text-neutral-600"
              : "disabled-time"
          }
          `}
        >
          {Intl.DateTimeFormat("ko-KR", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          }).format(date)}
        </div>
      ))}
    </div>
  )
}
