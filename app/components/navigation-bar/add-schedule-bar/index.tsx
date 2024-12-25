"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import PageControlButton from "@/app/components/navigation-bar/add-schedule-bar/page-control-button"
import AddScheduleForm from "@/app/components/navigation-bar/add-schedule-bar/add-schedule-form"

export default function AddScheduleBar() {
  return (
    <div
      className={
        "bg-neutral-50 rounded-2xl shadow-2xl p-3 flex justify-around items-center gap-2"
      }
    >
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
