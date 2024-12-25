import { atom } from "jotai"

const meetingStartState = atom<Date | undefined>(undefined)
const meetingEndState = atom<Date | undefined>(undefined)
const navigationModeState = atom((get) => {
  const start = get(meetingStartState)
  const end = get(meetingEndState)
  return start && end ? "creatMeeting" : "default"
})

const schedulePageState = atom<number>(0)

const neverState = atom<Set<string>>(new Set<string>())
const modifiableState = atom<Set<string>>(new Set<string>())

export {
  meetingEndState,
  meetingStartState,
  navigationModeState,
  schedulePageState,
  neverState,
  modifiableState,
}
