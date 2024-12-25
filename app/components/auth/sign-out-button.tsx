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
        "bg-sky-600 p-2 text-lg font-semibold rounded-xl text-center text-white w-full disabled:bg-sky-700 transition-all"
      }
      disabled={loading}
    >
      {loading ? "로그아웃 중..." : "로그아웃"}
    </button>
  )
}
