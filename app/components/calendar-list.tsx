import { differenceInMonths } from "date-fns"
import Calendar from "./calendar"
import { SetStateAction } from "react"

interface MonthType {
  year: number
  month: number
}

export default function CalendarList({
  startData,
  endData,
  start,
  setStart,
  end,
  setEnd,
}: {
  startData: MonthType
  endData: MonthType
  start: Date | undefined
  setStart: (args_0: SetStateAction<Date | undefined>) => void
  end: Date | undefined
  setEnd: (args_0: SetStateAction<Date | undefined>) => void
}) {
  const startDate = new Date(startData.year, startData.month)
  const endDate = new Date(endData.year, endData.month)

  const monthsBetween = differenceInMonths(endDate, startDate) + 1

  const monthList: MonthType[] = []

  let startYear = startData.year
  let startMonth = startData.month
  for (let i = 0; i < monthsBetween; i++) {
    if (startMonth < 12) {
      monthList.push({
        year: startYear,
        month: startMonth,
      })
    } else {
      startYear++
      startMonth = 0
      monthList.push({
        year: startYear,
        month: startMonth,
      })
    }
    startMonth++
  }

  return (
    <div className={"overflow-y-scroll w-full"}>
      {monthList.map((date, index) => (
        <Calendar
          year={date.year}
          month={date.month}
          key={index}
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
        />
      ))}
    </div>
  )
}
