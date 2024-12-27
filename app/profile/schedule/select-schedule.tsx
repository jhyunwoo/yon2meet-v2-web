"use client"

import DragToSelect from "@/app/components/drag-to-select"
import { modifiableState, neverState, schedulePageState } from "@/lib/states"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import createWeek from "@/lib/create-week"
import { ScheduleType } from "@/lib/get-meeting-schedules"
import { addYears } from "date-fns"

export default function SelectSchedule({
  schedules,
}: {
  schedules: ScheduleType[]
}) {
  const [schedulePage, setSchedulePage] = useAtom(schedulePageState)
  const [maxPage, setMaxPage] = useState(0)
  const [page, setPage] = useState(0)
  const [, setNever] = useAtom(neverState)
  const [, setModifiable] = useAtom(modifiableState)

  const today = new Date()
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )
  const endDate = addYears(startDate, 1)

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
  }, [maxPage, schedulePage, setSchedulePage])

  useEffect(() => {
    const neverList = new Set<string>()
    const modifiableList = new Set<string>()
    for (const schedule of schedules) {
      if (schedule.type === "never") {
        neverList.add(schedule.date.toJSON())
      } else {
        modifiableList.add(schedule.date.toJSON())
      }
      setNever(neverList)
      setModifiable(modifiableList)
    }
  }, [schedules, setModifiable, setNever])

  return (
    <div className={"w-full h-full flex"}>
      <DragToSelect dayList={weekDateList[page]} />
      <div
        className={"w-3 h-full bg-sky-800/50 ring-2 ring-sky-800 rounded-full"}
      />
    </div>
  )
}
