import { useRef } from "react"
import useDragToSelect from "@/lib/use-drag-to-select"
import timeList from "@/app/components/drag-to-select/time-list"
import { DayListType } from "@/lib/create-day-list"
import createDateList from "@/app/components/drag-to-select/create-date-list"
import { useAtom } from "jotai"
import { modifiableState, neverState } from "@/lib/states"

const NUM_ROWS = timeList.length
const NUM_COLS = 7

export default function TouchArea({ dayList }: { dayList: DayListType[] }) {
  // State to store selected box indices
  const [never, setNever] = useAtom(neverState)
  const [modifiable, setModifiable] = useAtom(modifiableState)

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
    dateList,
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
              ? never.has(dateList[i].toJSON())
                ? "never-time"
                : modifiable.has(dateList[i].toJSON())
                  ? "modifiable-time"
                  : ""
              : "disabled-time"
          }`}
        >
          {Intl.DateTimeFormat("ko-KR", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          }).format(dateList[i])}
        </div>
      )
    }
    return boxes
  }
  return (
    <div ref={gridRef} className={"w-full h-full grid grid-cols-7"}>
      {" "}
      {renderBoxes()}
    </div>
  )
}
