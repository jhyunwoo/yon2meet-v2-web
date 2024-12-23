import CalendarList from '@/app/components/calendar-list'
import DefaultLayout from '@/app/components/default-layout'
import Header from '@/app/components/header'

export default function HomePage() {
  return (
    <DefaultLayout>
      <Header>새로운 약속</Header>
      <CalendarList
        start={{ year: 2024, month: 12 }}
        end={{ year: 2025, month: 11 }}
      />
    </DefaultLayout>
  )
}
