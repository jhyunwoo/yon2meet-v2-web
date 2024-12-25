"use client"

import { addScheduleAction } from "@/app/components/navigation-bar/add-schedule-bar/actions"
import { useFormStatus } from "react-dom"
import { useAtom } from "jotai"
import { modifiableState, neverState } from "@/lib/states"
import { useParams } from "next/navigation"

function AddScheduleButton() {
  const { pending } = useFormStatus()
  return (
    <button
      className={"bg-sky-500 text-white p-2 rounded-xl w-full"}
      disabled={pending}
    >
      확인
    </button>
  )
}

export default function AddScheduleForm() {
  const [never] = useAtom(neverState)
  const [modifiable] = useAtom(modifiableState)
  const params = useParams<{ meetingId: string }>()

  const addScheduleWithData = addScheduleAction
    .bind(null, params.meetingId)
    .bind(null, Array.from(never))
    .bind(null, Array.from(modifiable))

  return (
    <form action={addScheduleWithData} className={"w-1/3"}>
      <AddScheduleButton />
    </form>
  )
}
