import { meetingEndState, meetingStartState } from "@/lib/states"
import { useAtom } from "jotai"
import { motion } from "motion/react"
import { createMeeting } from "@/app/components/navigation-bar/create-meeting-bar/actions"
import CreateMeetingButton from "@/app/components/navigation-bar/create-meeting-bar/create-meeting-button"
import ResetDateButton from "@/app/components/navigation-bar/create-meeting-bar/reset-date-button"
import { useSession } from "next-auth/react"
import SignInWithKakao from "@/app/components/auth/sign-in-with-kakao"

export default function CreateMeetingBar() {
  const [start] = useAtom(meetingStartState)
  const [end] = useAtom(meetingEndState)

  const { status } = useSession()

  const formData = new FormData()
  formData.set("start", start?.toJSON()!)
  formData.set("end", end?.toJSON()!)
  const createMeetingWithFormData = createMeeting.bind(null, formData)

  return (
    <>
      {status === "authenticated" ? (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          action={createMeetingWithFormData}
          className={
            "bg-neutral-50 backdrop-blur-sm rounded-2xl shadow-2xl p-3 flex justify-around items-center gap-2"
          }
        >
          <ResetDateButton />
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
