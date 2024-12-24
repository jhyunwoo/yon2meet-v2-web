"use client"

import { useFormStatus } from "react-dom"

export default function MeetingTitle({ title }: { title: string }) {
  const { pending } = useFormStatus()
  return (
    <>
      <input
        type={"text"}
        disabled={pending}
        defaultValue={title}
        name={"title"}
        className={
          "p-1 px-2 rounded-xl focus:outline-0 focus:ring-2 ring-sky-500 disabled:bg-sky-100 transition-all bg-neutral-100 text-xl font-bold w-full"
        }
      />
      <button
        disabled={pending}
        type={"submit"}
        className={"p-2 rounded-lg bg-sky-700 text-white w-24 text-sm"}
      >
        {pending ? "수정 중..." : "수정"}
      </button>
    </>
  )
}
