"use client"

import React, { useState, useRef } from "react"
import useDragToSelect from "@/lib/use-drag-to-select"
import getKorDay from "@/lib/get-kor-day"
import fixStringLength from "@/lib/fix-string-length"
import timeList from "@/app/components/drag-to-select/time-list"
import { DayListType } from "@/lib/create-day-list"
import createDateList from "@/app/components/drag-to-select/create-date-list"

const NUM_ROWS = timeList.length
const NUM_COLS = 7

export default function DragToSelect({ dayList }: { dayList: DayListType[] }) {
  // State to store selected box indices
  const [never, setNever] = useState<Set<number>>(new Set())
  const [modifiable, setModifiable] = useState<Set<number>>(new Set())

  const dateList: Date[] = createDateList(dayList)

  // Reference to the grid container
  const gridRef = useRef<HTMLDivElement>(null)

  useDragToSelect({
    never: never,
    setNever: setNever,
    modifiable: modifiable,
    setModifiable: setModifiable,
    gridRef,
    NUM_COLS,
    NUM_ROWS,
  })

  // Render all boxes in the grid
  const renderBoxes = () => {
    const boxes = []
    for (let i = 0; i < NUM_ROWS * NUM_COLS; i++) {
      boxes.push(
        <div
          key={i}
          className={`w-full h-full text-xs transition-all flex justify-center items-center border-[1px] ${
            dayList[dateList[i].getDay()].isAvailable
              ? never.has(i)
                ? "never-time"
                : modifiable.has(i)
                  ? "modifiable-time"
                  : ""
              : "disabled-time"
          }`}
        >
          {fixStringLength(String(dateList[i].getHours()), 2, "0")}:
          {fixStringLength(String(dateList[i].getMinutes()), 2, "0")}
        </div>
      )
    }
    return boxes
  }

  return (
    <div
      className={`grid grid-cols-7 h-full w-[90vw] snap-center bg-white rounded-xl p-2`}
      ref={gridRef}
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
      {renderBoxes()}
    </div>
  )
}
