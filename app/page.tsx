import CalendarList from "@/app/components/calendar-list"
import DefaultLayout from "@/app/components/default-layout"
import Header from "@/app/components/header"
import SetStartEndParams from "@/app/components/set-start-end-params"
import { Suspense } from "react"

export default function HomePage() {
  const today = new Date()

  return (
    <DefaultLayout>
      <Header>새로운 약속</Header>
      <CalendarList
        start={{ year: today.getFullYear(), month: today.getMonth() }}
        end={{ year: today.getFullYear() + 1, month: today.getMonth() - 1 }}
      />
      <Suspense>
        <SetStartEndParams />
      </Suspense>
    </DefaultLayout>
  )
}
