import { addDays } from "date-fns"

export interface DayListType {
  date: Date
  isAvailable: boolean
}

export default function createDayList(startDate: Date, endDate: Date) {
  const dayList: DayListType[] = []
  for (let i = 0; i < startDate.getDay(); i++) {
    dayList.push({
      date: addDays(startDate, -(startDate.getDay() - i)),
      isAvailable: false,
    })
  }

  for (let i = 0; i <= endDate.getDay() - startDate.getDay(); i++) {
    dayList.push({ date: addDays(startDate, i), isAvailable: true })
  }

  for (let i = 0; i < 6 - endDate.getDay(); i++) {
    dayList.push({ date: addDays(endDate, i + 1), isAvailable: false })
  }
  return dayList
}
