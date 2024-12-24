import createDayList, { DayListType } from "@/lib/create-day-list"
import { addDays } from "date-fns"

export default function createWeek(startDate: Date, endDate: Date) {
  const weekDataList: DayListType[][] = []
  let dateIndex = startDate

  while (dateIndex <= endDate) {
    let addedDate = addDays(dateIndex, 6 - dateIndex.getDay())
    addedDate = addedDate > endDate ? endDate : addedDate

    weekDataList.push(createDayList(dateIndex, addedDate))
    dateIndex = addDays(addedDate, 1)
  }

  return weekDataList
}
