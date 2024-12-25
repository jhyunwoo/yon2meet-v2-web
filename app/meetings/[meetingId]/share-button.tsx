"use client"

import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline"

export default function ShareButton({ meetingId }: { meetingId: string }) {
  function handleClick() {
    navigator.clipboard.writeText(
      `https://yon2meet.moveto.kr/meetings/${meetingId}`
    )
    alert("링크를 클립보드에 복사되었습니다.")
  }

  return (
    <button
      type={"button"}
      className={
        "w-1/3 p-2 rounded-xl bg-sky-500 text-white flex gap-1 items-center justify-center"
      }
      onClick={handleClick}
    >
      <ArrowUpOnSquareIcon className={"size-6"} />
      <p className={"pr-2"}>공유</p>
    </button>
  )
}
