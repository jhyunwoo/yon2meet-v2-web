"use client"

import semesterList from "@/lib/semester-list"
import { useAtom } from "jotai/index"
import { isLoadingState, timetableState } from "@/lib/states"
import Loading from "@/app/loading"

const timeFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  day: "numeric",
  month: "long",
}

export default function TimetableSemester() {
  const [timetable, setTimetable] = useAtom(timetableState)
  const [isLoading] = useAtom(isLoadingState)

  function handleClick(data: { title: string; start: Date; end: Date }) {
    if (timetable === JSON.stringify(data)) {
      setTimetable("")
    } else {
      setTimetable(JSON.stringify(data))
    }
  }

  return (
    <div
      className={"flex flex-col items-center justify-center gap-2 mt-4 w-full"}
    >
      {isLoading && <Loading />}
      {semesterList.map((data, i) => (
        <button
          key={i}
          onClick={() => handleClick(data)}
          className={`ring-2 w-full flex-col rounded-lg ring-sky-700 p-1 px-2 flex items-center justify-center ${timetable === JSON.stringify(data) ? "bg-sky-700 text-white" : ""}`}
        >
          <p>{data.title}</p>
          <div className={"flex items-center justify-center gap-1"}>
            <p className={"text-xs"}>
              {Intl.DateTimeFormat("ko-KR", timeFormat).format(data.start)}
            </p>
            <p>-</p>
            <p className={"text-xs"}>
              {Intl.DateTimeFormat("ko-KR", timeFormat).format(data.end)}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}
