import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'
import StateProvider from '@/app/components/state-provider'
import NavigationBar from '@/app/components/navigation-bar'

export const metadata: Metadata = {
  title: 'Yon2Meet',
  description: '서로 시간 맞춰야 할 땐 연투밋',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={'bg-neutral-50'}>
        <StateProvider>
          {children}
          <NavigationBar />
        </StateProvider>
      </body>
    </html>
  )
}
