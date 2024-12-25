"use client"

import { addScheduleAction } from "@/app/components/navigation-bar/add-schedule-bar/actions"
import { useFormStatus } from "react-dom"
import { useAtom } from "jotai"
import { modifiableState, neverState } from "@/lib/states"

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

  const addScheduleWithNever = addScheduleAction.bind(null, Array.from(never))
  const addScheduleWithModifiable = addScheduleWithNever.bind(
    null,
    Array.from(modifiable)
  )

  return (
    <form action={addScheduleWithModifiable} className={"w-1/3"}>
      <AddScheduleButton />
    </form>
  )
}
