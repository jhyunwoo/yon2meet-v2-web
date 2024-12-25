"use client"

import DragToSelect from "@/app/components/drag-to-select"
import { schedulePageState } from "@/lib/states"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import createWeek from "@/lib/create-week"

export default function SelectSchedule({
  startDate,
  endDate,
}: {
  startDate: Date
  endDate: Date
}) {
  const [schedulePage, setSchedulePage] = useAtom(schedulePageState)
  const [maxPage, setMaxPage] = useState(0)
  const [page, setPage] = useState(0)

  const weekDateList = createWeek(startDate, endDate)

  useEffect(() => {
    setMaxPage(weekDateList.length - 1)
  }, [weekDateList])

  useEffect(() => {
    if (schedulePage < 0) {
      setSchedulePage(0)
      setPage(0)
    } else if (schedulePage > maxPage) {
      setSchedulePage(maxPage)
      setPage(maxPage)
    } else {
      setPage(schedulePage)
    }
  }, [maxPage, schedulePage])

  return (
    <div className={"w-full h-full flex"}>
      <DragToSelect dayList={weekDateList[page]} />
      <div
        className={"w-3 h-full bg-sky-800/50 ring-2 ring-sky-800 rounded-full"}
      />
    </div>
  )
}
