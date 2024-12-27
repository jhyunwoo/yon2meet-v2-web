"use client"

import CalendarList from "@/app/components/calendar-list"
import DefaultLayout from "@/app/components/default-layout"
import Header from "@/app/components/header"
import SetStartEndParams from "@/app/components/set-start-end-params"
import { useAtom } from "jotai/index"
import { meetingEndState, meetingStartState } from "@/lib/states"
import { Suspense } from "react"

export default function HomePage() {
  const today = new Date()

  const [start, setStart] = useAtom(meetingStartState)
  const [end, setEnd] = useAtom(meetingEndState)

  return (
    <DefaultLayout>
      <Header>새로운 약속</Header>
      <CalendarList
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        startData={{ year: today.getFullYear(), month: today.getMonth() }}
        endData={{ year: today.getFullYear() + 1, month: today.getMonth() - 1 }}
      />

      <Suspense>
        <SetStartEndParams />
      </Suspense>
    </DefaultLayout>
  )
}
