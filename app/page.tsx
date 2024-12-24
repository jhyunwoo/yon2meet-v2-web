import CalendarList from '@/app/components/calendar-list'
import DefaultLayout from '@/app/components/default-layout'
import Header from '@/app/components/header'

export default function HomePage() {
  const today = new Date()

  return (
    <DefaultLayout>
      <Header>새로운 약속</Header>
      <CalendarList
        start={{ year: today.getFullYear(), month: today.getMonth() }}
        end={{ year: today.getFullYear() + 1, month: today.getMonth() - 1 }}
      />
    </DefaultLayout>
  )
}
