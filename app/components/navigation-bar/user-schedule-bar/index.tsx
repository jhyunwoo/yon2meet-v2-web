"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import PageControlButton from "@/app/components/navigation-bar/user-schedule-bar/page-control-button"
import AddScheduleForm from "@/app/components/navigation-bar/user-schedule-bar/add-schedule-form"

export default function UserScheduleBar() {
  return (
    <div className={"bar-layout"}>
      <PageControlButton add={-1}>
        <ChevronLeftIcon className={"size-6"} />
      </PageControlButton>
      <AddScheduleForm />
      <PageControlButton add={1}>
        <ChevronRightIcon className={"size-6"} />
      </PageControlButton>
    </div>
  )
}
