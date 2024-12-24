import createDayList, { DayListType } from "@/lib/create-day-list"
import { addDays } from "date-fns"

export default function createWeek(startDate: Date, endDate: Date) {
  const weekDataList: DayListType[][] = []
  let dateIndex = startDate
  while (dateIndex <= endDate) {
    let endDate = addDays(dateIndex, 6 - dateIndex.getDay())
    endDate = endDate > endDate ? endDate : endDate

    weekDataList.push(createDayList(dateIndex, endDate))
    dateIndex = addDays(endDate, 1)
  }

  return weekDataList
}
