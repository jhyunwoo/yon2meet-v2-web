import timeList from "@/app/components/drag-to-select/time-list";
import { addHours, addMinutes } from "date-fns";
import { DayListType } from "@/app/components/drag-to-select/create-day-list";

export default function createDateList(
  dayList: DayListType[],
  NUM_COLS: number,
) {
  const dateList: Date[] = [];

  for (let i = 0; i < timeList.length; i++) {
    for (let j = 0; j < NUM_COLS; j++) {
      const hours = Number(timeList[i].split(":")[0]);
      const minutes = Number(timeList[i].split(":")[1]);
      dateList.push(addMinutes(addHours(dayList[j].date, hours), minutes));
    }
  }
  return dateList;
}
