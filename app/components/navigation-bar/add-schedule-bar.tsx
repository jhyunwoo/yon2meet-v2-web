import { schedulePageState } from "@/lib/states"
import { useAtom } from "jotai"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

export default function AddScheduleBar() {
  const [, setSchedulePage] = useAtom(schedulePageState)
  return (
    <div
      className={
        "bg-neutral-50 rounded-2xl shadow-2xl p-3 flex justify-around items-center gap-2"
      }
    >
      <button
        className={
          "w-1/3 p-2 rounded-xl bg-sky-700 text-white flex items-center justify-center"
        }
        onClick={() => setSchedulePage((prev) => prev - 1)}
      >
        <ChevronLeftIcon className={"size-6"} />
      </button>
      <button className={"bg-sky-500 text-white p-2 rounded-xl w-1/3"}>
        스케줄 추가
      </button>
      <button
        className={
          "w-1/3 p-2 rounded-xl bg-sky-700 text-white flex items-center justify-center"
        }
        onClick={() => setSchedulePage((prev) => prev + 1)}
      >
        <ChevronRightIcon className={"size-6"} />
      </button>
    </div>
  )
}
