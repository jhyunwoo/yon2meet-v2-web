'use client'

import { Provider } from 'jotai'
import { ReactNode } from 'react'

export default function StateProvider({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>
}
