"use client"

import { ReactNode } from "react"
import { schedulePageState } from "@/lib/states"
import { useAtom } from "jotai"

export default function PageControlButton({
  children,
  add,
}: {
  children: ReactNode
  add: number
}) {
  const [, setSchedulePage] = useAtom(schedulePageState)

  return (
    <button
      className={
        "w-1/3 p-2 rounded-xl bg-sky-700 text-white flex items-center justify-center"
      }
      onClick={() => setSchedulePage((prev) => prev + add)}
    >
      {children}
    </button>
  )
}
