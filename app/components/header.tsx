import { ReactNode } from "react"
import Link from "next/link"

export default function Header({
  children,
  isEverytime = false,
}: {
  children: ReactNode
  isEverytime?: boolean
}) {
  return (
    <div
      className={
        "fixed top-0 left-0 w-full p-4 bg-neutral-50 flex justify-between items-center"
      }
    >
      <h1 className={"text-xl font-bold"}>{children}</h1>
      {!isEverytime && (
        <Link
          href={"/everytime"}
          className={"text-sm bg-sky-600 p-1 px-3 rounded-lg text-white"}
        >
          에브리타임 시간표 등록
        </Link>
      )}
    </div>
  )
}
