"use client"

import { useAtom } from "jotai"
import { meetingEndState, meetingStartState } from "@/lib/states"
import { useEffect } from "react"

export default function ClearMeetingStartEnd() {
  const [, setStart] = useAtom(meetingStartState)
  const [, setEnd] = useAtom(meetingEndState)

  useEffect(() => {
    setStart(undefined)
    setEnd(undefined)
  }, [setEnd, setStart])

  return <></>
}
