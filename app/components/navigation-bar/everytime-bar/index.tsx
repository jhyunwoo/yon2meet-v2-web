import { ChevronLeftIcon, PhotoIcon } from "@heroicons/react/24/outline"
import NavigationButton from "@/app/components/navigation-bar/navigation-button"
import { usePathname, useRouter } from "next/navigation"
import { useRef } from "react"
import { useAtom } from "jotai/index"
import { isLoadingState, timetableState } from "@/lib/states"

export default function EverytimeBar() {
  const path = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)
  const [timetable] = useAtom(timetableState)
  const router = useRouter()
  const [, setIsLoading] = useAtom(isLoadingState)

  function handleClick() {
    if (!timetable) return alert("학기를 선택해주세요.")
    inputRef.current?.click()
  }

  async function handleImageInput() {
    if (!inputRef?.current?.files?.[0]) return alert("Please upload a file")
    setIsLoading(true)
    const formData = new FormData()
    formData.append("file", inputRef?.current?.files?.[0]) // key를 'file'로 설정
    const response = await fetch(process.env.NEXT_PUBLIC_MODEL_URL!, {
      body: formData,
      method: "POST",
    })
    const scheduleData = await response.json()

    console.log(scheduleData)

    const postSchedules = await fetch("/api/everytime", {
      method: "POST",
      body: JSON.stringify({
        schedule: scheduleData.schedule,
        timetable: JSON.parse(timetable),
      }),
    })
    const postResult = await postSchedules.json()
    if (postResult.message === "Success") {
      alert("시간표가 업로드되었습니다.")
      router.replace("/profile/schedule")
    } else {
      alert("시간표를 업로드하는데 실패했습니다.")
    }
    setIsLoading(false)
  }

  return (
    <div className={"bar-layout"}>
      <div className={"w-1/3"}>
        <NavigationButton href={"/"} path={path}>
          <ChevronLeftIcon className={"size-7"} />
          <p className={"text-xs"}>새로운 미팅</p>
        </NavigationButton>
      </div>
      <input
        hidden={true}
        type={"file"}
        accept={"image/*"}
        ref={inputRef}
        onChange={handleImageInput}
      />
      <button
        type={"button"}
        className={
          "w-2/3 flex flex-col p-1 items-center justify-center bg-sky-800 text-white rounded-xl ring-2 ring-sky-800"
        }
        onClick={handleClick}
      >
        <PhotoIcon className={"size-7"} />
        <p className={"text-xs"}>시간표 사진 업로드</p>
      </button>
    </div>
  )
}
