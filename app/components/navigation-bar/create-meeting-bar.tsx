import { meetingEndState, meetingStartState } from '@/lib/states'
import { useAtom } from 'jotai'
import { motion } from 'motion/react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { createMeeting } from '@/app/components/navigation-bar/actions'
import { useEffect, useRef } from 'react'

export default function CreateMeetingBar() {
  const [start, setStart] = useAtom(meetingStartState)
  const [end, setEnd] = useAtom(meetingEndState)

  const startRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (start && startRef.current) {
      startRef.current.value = start.toDateString()
    }
    if (end && endRef.current) {
      endRef.current.value = end.toDateString()
    }
  }, [end, start, startRef, endRef])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={
        'bg-neutral-50 backdrop-blur-sm rounded-2xl shadow-2xl p-3 flex justify-around items-center gap-2'
      }
    >
      <button
        type={'button'}
        className={
          'w-1/4 p-3 rounded-xl font-semibold text-lg ring-2 ring-red-600 flex items-center justify-center'
        }
        onClick={() => {
          setStart(undefined)
          setEnd(undefined)
        }}
      >
        <TrashIcon className={'size-7 text-red-700'} />
      </button>
      <form action={createMeeting} className={'w-3/4'}>
        <input ref={startRef} hidden={true} name={'start'} defaultValue={''} />
        <input ref={endRef} hidden={true} name={'end'} defaultValue={''} />
        <button
          type={'submit'}
          className={
            'w-full p-3 rounded-xl ring-2 ring-sky-800 bg-sky-800 text-white font-semibold text-lg'
          }
        >
          새 미팅 생성
        </button>
      </form>
    </motion.div>
  )
}
