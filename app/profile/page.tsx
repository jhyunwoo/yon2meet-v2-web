import DefaultLayout from "@/app/components/default-layout"
import Header from "@/app/components/header"
import { auth } from "@/auth"
import SignInWithKakao from "@/app/components/auth/sign-in-with-kakao"
import SignOutButton from "@/app/components/auth/sign-out-button"
import Link from "next/link"
import { ChevronRightIcon } from "@heroicons/react/24/outline"

export default async function ProfilePage() {
  const session = await auth()

  if (!session) {
    return (
      <DefaultLayout>
        <div className={"w-full p-4"}>
          <SignInWithKakao redirect={"/profile"} />
        </div>
      </DefaultLayout>
    )
  }

  return (
    <div
      className={"w-screen min-h-screen flex flex-col gap-4 pb-24 pt-16 p-4"}
    >
      <Header>프로필</Header>
      <div className={"p-4 rounded-xl bg-white flex flex-col gap-2"}>
        <div className={"text-xl font-semibold"}>{session?.user?.name}</div>
        <SignOutButton />
      </div>
      <Link
        href={"/profile/schedule"}
        className={
          "p-4 rounded-xl flex items-center justify-start gap-2 bg-sky-600 text-white"
        }
      >
        <p>내 스케줄 확인하기</p>
        <ChevronRightIcon className={"size-7"} />
      </Link>
    </div>
  )
}
