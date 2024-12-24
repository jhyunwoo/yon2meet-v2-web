import { useFormStatus } from 'react-dom'

export default function CreateMeetingButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type={'submit'}
      className={
        'w-3/4 p-3 rounded-xl ring-2 ring-sky-700 bg-sky-700 disabled:bg-sky-800 text-white font-semibold text-lg transition-colors'
      }
      disabled={pending}
    >
      새 미팅 생성
    </button>
  )
}
