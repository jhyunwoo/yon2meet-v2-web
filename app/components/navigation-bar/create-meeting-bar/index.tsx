import { meetingEndState, meetingStartState } from "@/lib/states"
import { useAtom } from "jotai"
import { motion } from "motion/react"
import { createMeeting } from "@/app/components/navigation-bar/create-meeting-bar/actions"
import { useEffect, useRef } from "react"
import CreateMeetingButton from "@/app/components/navigation-bar/create-meeting-bar/create-meeting-button"
import ResetDateButton from "@/app/components/navigation-bar/create-meeting-bar/reset-date-button"
import { useSession } from "next-auth/react"
import SignInWithKakao from "@/app/components/auth/sign-in-with-kakao"

export default function CreateMeetingBar() {
  const [start] = useAtom(meetingStartState)
  const [end] = useAtom(meetingEndState)

  const startRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLInputElement>(null)

  const { status } = useSession()

  useEffect(() => {
    if (start && startRef.current) {
      startRef.current.value = start.toDateString()
    }
    if (end && endRef.current) {
      endRef.current.value = end.toDateString()
    }
  }, [end, start, startRef, endRef])

  console.log(status)

  return (
    <>
      {status === "authenticated" ? (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          action={createMeeting}
          className={
            "bg-neutral-50 backdrop-blur-sm rounded-2xl shadow-2xl p-3 flex justify-around items-center gap-2"
          }
        >
          <ResetDateButton />
          <input
            ref={startRef}
            hidden={true}
            name={"start"}
            defaultValue={""}
          />
          <input ref={endRef} hidden={true} name={"end"} defaultValue={""} />
          <CreateMeetingButton />
        </motion.form>
      ) : (
        <div
          className={
            "bg-neutral-50 backdrop-blur-sm rounded-2xl shadow-2xl p-3 flex justify-around items-center gap-2"
          }
        >
          <SignInWithKakao redirect={"/"} />
        </div>
      )}
    </>
  )
}
