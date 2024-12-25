"use client"

import { useFormStatus } from "react-dom"
import LoadingSpinner from "@/app/components/loading-spinner"

export default function MeetingTitle({ title }: { title: string }) {
  const { pending } = useFormStatus()
  return (
    <>
      <input
        type={"text"}
        disabled={pending}
        defaultValue={title}
        placeholder={"미팅 제목을 입력하세요"}
        name={"title"}
        className={
          "p-1 px-2 rounded-xl focus:outline-0 selection:text-sky-400 ring-2 focus:ring-offset-1 focus:ring-sky-700 ring-sky-500 disabled:bg-sky-100 transition-all bg-neutral-100 text-xl font-bold w-full"
        }
      />
      <button
        disabled={pending}
        type={"submit"}
        className={
          "p-2 rounded-lg bg-sky-700 text-white w-16 text-sm flex items-center justify-center"
        }
      >
        {pending ? (
          <LoadingSpinner
            className={"size-5 border-2 border-t-sky-200 border-neutral-300/50"}
          />
        ) : (
          "수정"
        )}
      </button>
    </>
  )
}
