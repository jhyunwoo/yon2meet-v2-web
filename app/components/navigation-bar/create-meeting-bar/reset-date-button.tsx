import { useAtom } from 'jotai'
import { meetingEndState, meetingStartState } from '@/lib/states'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useFormStatus } from 'react-dom'

export default function ResetDateButton() {
  const [, setStart] = useAtom(meetingStartState)
  const [, setEnd] = useAtom(meetingEndState)
  const { pending } = useFormStatus()

  return (
    <button
      type={'button'}
      className={
        'w-1/4 p-3 rounded-xl font-semibold text-lg ring-2 ring-red-600 disabled:bg-red-100 disabled:text-red-700 transition-colors flex items-center justify-center'
      }
      onClick={() => {
        setStart(undefined)
        setEnd(undefined)
      }}
      disabled={pending}
    >
      <TrashIcon className={'size-7 text-red-700'} />
    </button>
  )
}
