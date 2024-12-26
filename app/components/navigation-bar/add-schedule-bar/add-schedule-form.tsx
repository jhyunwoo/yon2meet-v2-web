"use client"

import { addScheduleAction } from "@/app/components/navigation-bar/add-schedule-bar/actions"
import { useFormStatus } from "react-dom"
import { useAtom } from "jotai"
import { modifiableState, neverState } from "@/lib/states"
import { useParams } from "next/navigation"
import LoadingSpinner from "@/app/components/loading-spinner"

function AddScheduleButton() {
  const { pending } = useFormStatus()
  return (
    <button
      className={
        "bg-sky-500 disabled:bg-sky-600 transition-all text-white p-2 rounded-xl w-full flex items-center justify-center"
      }
      disabled={pending}
    >
      {pending ? (
        <LoadingSpinner
          className={"size-6 border-2 border-t-sky-200 border-neutral-300/50"}
        />
      ) : (
        "확인"
      )}
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
