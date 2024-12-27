"use client"

import TouchArea from "@/app/components/drag-to-select/touch-area"
import { DayListType } from "@/lib/create-day-list"

export default function DragToSelect({ dayList }: { dayList: DayListType[] }) {
  return (
    <div
      className={`flex flex-col h-full w-full snap-center bg-white rounded-xl p-2`}
    >
      <div className={"grid grid-cols-7 w-full"}>
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
      </div>
      <TouchArea dayList={dayList} />
    </div>
  )
}
