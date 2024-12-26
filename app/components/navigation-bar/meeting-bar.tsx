"use client"

import NavigationButton from "@/app/components/navigation-bar/navigation-button"
import ShareButton from "@/app/components/navigation-bar/share-button"
import {
  CalendarDateRangeIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export default function MeetingBar() {
  const params = useParams()
  const path = usePathname()

  return (
    <div className={"bar-layout"}>
      <NavigationButton href={"/meetings"} path={path}>
        <ListBulletIcon className={"size-7"} />
        <p className={"text-xs"}>미팅 기록</p>
      </NavigationButton>
      <Link
        href={`/meetings/${params.meetingId}/schedule`}
        className={`w-full p-1 flex-col rounded-xl transition-all flex items-center justify-center ring-2  ring-sky-800 text-white bg-sky-800`}
      >
        <CalendarDateRangeIcon className={"size-7"} />
        <p className={"text-xs"}>스케줄 추가</p>
      </Link>
      <ShareButton meetingId={params.meetingId as string} />
    </div>
  )
}
