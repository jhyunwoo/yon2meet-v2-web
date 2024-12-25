"use client"

import { useAtom } from "jotai"
import { navigationModeState } from "@/lib/states"
import DefaultBar from "@/app/components/navigation-bar/default-bar"
import CreateMeetingBar from "@/app/components/navigation-bar/create-meeting-bar"
import { usePathname } from "next/navigation"
import Index from "@/app/components/navigation-bar/add-schedule-bar"

export default function NavigationBar() {
  const path = usePathname()
  const [state] = useAtom(navigationModeState)

  return (
    <div className={"fixed bottom-0 left-0 w-screen p-2 transition-all"}>
      {path.includes("/schedule") ? (
        <Index />
      ) : (
        <>
          {state === "default" && <DefaultBar />}
          {state === "creatMeeting" && <CreateMeetingBar />}
        </>
      )}
    </div>
  )
}
