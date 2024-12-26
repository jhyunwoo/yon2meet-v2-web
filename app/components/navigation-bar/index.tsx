"use client"

import { useAtom } from "jotai"
import { navigationModeState } from "@/lib/states"
import DefaultBar from "@/app/components/navigation-bar/default-bar"
import CreateMeetingBar from "@/app/components/navigation-bar/create-meeting-bar"
import { useParams, usePathname } from "next/navigation"
import AddScheduleBar from "@/app/components/navigation-bar/add-schedule-bar"
import MeetingBar from "@/app/components/navigation-bar/meeting-bar"

function BarController() {
  const path = usePathname()
  const [state] = useAtom(navigationModeState)
  const params = useParams()

  if (path.includes("/schedule")) {
    return <AddScheduleBar />
  } else if (params?.meetingId) {
    return <MeetingBar />
  } else if (state === "default") {
    return <DefaultBar />
  } else if (state === "creatMeeting") {
    return <CreateMeetingBar />
  }
}

export default function NavigationBar() {
  return (
    <div className={"fixed bottom-0 left-0 w-screen p-2 transition-all"}>
      <BarController />
    </div>
  )
}
