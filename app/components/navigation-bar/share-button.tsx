"use client"

import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline"
import { useAtom } from "jotai"
import { meetingTitleState } from "@/lib/states"

export default function ShareButton({ meetingId }: { meetingId: string }) {
  const [meetingTitle] = useAtom(meetingTitleState)

  async function handleClick() {
    const isMobile = /Mobi/i.test(window.navigator.userAgent)

    const shareData = {
      title: "연투밋",
      text: `${meetingTitle}에 참여해보세요!`,
      url: `https://yon2meet.moveto.kr/meetings/${meetingId}`,
    }
    if (isMobile) {
      await navigator.share(shareData).catch((error) => {
        console.error(error)
      })
    } else {
      await navigator.clipboard.writeText(
        `https://yon2meet.moveto.kr/meetings/${meetingId}`
      )
      alert("링크를 클립보드에 복사했습니다.")
    }
  }

  return (
    <button
      type={"button"}
      className={`w-full p-1 flex-col rounded-xl transition-all flex items-center justify-center ring-2  ring-sky-700 text-white bg-sky-700`}
      onClick={handleClick}
    >
      <ArrowUpOnSquareIcon className={"size-7"} />
      <p className={"text-xs"}>공유</p>
    </button>
  )
}
