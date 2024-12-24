import { atom } from "jotai"

const meetingStartState = atom<Date | undefined>(undefined)
const meetingEndState = atom<Date | undefined>(undefined)
const navigationModeState = atom((get) => {
  const start = get(meetingStartState)
  const end = get(meetingEndState)
  return start && end ? "creatMeeting" : "default"
})

export { meetingEndState, meetingStartState, navigationModeState }
