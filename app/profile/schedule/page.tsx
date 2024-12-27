import getUserSchedule from "@/lib/get-user-schedule"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import SelectSchedule from "@/app/profile/schedule/select-schedule"

export default async function SchedulePage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  const schedules = await getUserSchedule()

  return (
    <div className={"w-screen h-screen flex flex-col pb-24 p-2"}>
      <div
        className={
          "w-full grid grid-cols-2 gap-2 bg-white rounded-xl p-2 px-4 text-sm justify-items-start"
        }
      >
        <div className={"flex items-center justify-center gap-2"}>
          <div className={"size-4 rounded-full bg-sky-800"} />
          <p>조정 불가한 시간</p>
        </div>
        <div className={"flex items-center justify-center gap-2"}>
          <div className={"size-4 rounded-full bg-sky-500"} />
          <p>조정 가능한 시간</p>
        </div>
      </div>
      <SelectSchedule schedules={schedules} />
    </div>
  )
}
