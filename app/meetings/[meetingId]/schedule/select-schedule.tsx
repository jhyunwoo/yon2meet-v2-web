"use client"

import DragToSelect from "@/app/components/drag-to-select"
import { schedulePageState } from "@/lib/states"
import { useAtom } from "jotai"
import { DayListType } from "@/lib/create-day-list"
import { useEffect, useState } from "react"

export default function SelectSchedule({
  weekDateList,
}: {
  weekDateList: DayListType[][]
}) {
  const [schedulePage, setSchedulePage] = useAtom(schedulePageState)
  const [maxPage, setMaxPage] = useState(0)
  const [page, setPage] = useState(0)

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

  return <DragToSelect dayList={weekDateList[page]} />
}
