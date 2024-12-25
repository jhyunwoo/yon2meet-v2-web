"use client"

import { useAtom } from "jotai"
import { meetingEndState, meetingStartState } from "@/lib/states"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function SetStartEndParams() {
  const [start, setStart] = useAtom(meetingStartState)
  const [end, setEnd] = useAtom(meetingEndState)

  const router = useRouter()
  const searchParams = useSearchParams()
  const startParam = searchParams.get("start")
  const endParam = searchParams.get("end")

  useEffect(() => {
    setStart(startParam ? new Date(startParam) : undefined)
    setEnd(endParam ? new Date(endParam) : undefined)
  }, [startParam, endParam])

  useEffect(() => {
    let params = "/"
    if (start && end) {
      params = `/?start=${start.toJSON()}&end=${end.toJSON()}`
    } else if (start) {
      params = `/?start=${start.toJSON()}`
    }
    router.replace(params)
  }, [start, end])

  return <></>
}
