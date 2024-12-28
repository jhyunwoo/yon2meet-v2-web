"use client"

import { useAtom } from "jotai/index"
import { meetingEndState, meetingStartState } from "@/lib/states"
import { useEffect } from "react"

export default function ResetStartEnd() {
  const [, setStart] = useAtom(meetingStartState)
  const [, setEnd] = useAtom(meetingEndState)

  useEffect(() => {
    setStart(undefined)
    setEnd(undefined)
  }, [setEnd, setStart])
  return <></>
}
