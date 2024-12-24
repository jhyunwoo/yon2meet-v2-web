"use client"

import { useFormStatus } from "react-dom"

export default function KakaoLoginButton() {
  const { pending } = useFormStatus()
  return (
    <button type={"submit"} disabled={pending}>
      {pending ? "로그인 중..." : "카카오로 로그인"}
    </button>
  )
}
