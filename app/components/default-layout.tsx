import { ReactNode } from "react"

export default function DefaultLayout({ children }: { children?: ReactNode }) {
  return (
    <div
      className={
        "w-screen min-h-screen flex flex-col items-center justify-center pb-24 pt-16"
      }
    >
      {children}
    </div>
  )
}
