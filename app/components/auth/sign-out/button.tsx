"use client"

import { useFormStatus } from "react-dom"

export default function SignOutButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type={"submit"}
      disabled={pending}
      className={
        "bg-sky-600 text-white p-2 rounded-xl disabled:bg-sky-700 transition-all w-full"
      }
    >
      {pending ? "로그아웃 중..." : "로그아웃"}
    </button>
  )
}
