"use client"

import { signOut } from "next-auth/react"
import { useState } from "react"

export default function SignOutButton() {
  const [loading, setLoading] = useState(false)
  return (
    <button
      onClick={() => {
        setLoading(true)
        signOut().then(() => setLoading(false))
      }}
      className={
        "p-1 text-sm font-semibold rounded-lg text-center ring-2 ring-sky-600 w-full disabled:bg-sky-50 transition-all"
      }
      disabled={loading}
    >
      {loading ? "로그아웃 중..." : "로그아웃"}
    </button>
  )
}
