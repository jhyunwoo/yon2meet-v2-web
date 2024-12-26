import DefaultLayout from "@/app/components/default-layout"
import Header from "@/app/components/header"
import { auth } from "@/auth"
import SignInWithKakao from "@/app/components/auth/sign-in-with-kakao"
import SignOutButton from "@/app/components/auth/sign-out-button"

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
    <div className={"w-screen min-h-screen flex flex-col pb-24 pt-16 p-4"}>
      <Header>프로필</Header>
      <div className={"p-4 rounded-xl bg-white "}>
        <div className={"text-xl font-semibold"}>{session?.user?.name}</div>
        <SignOutButton />
      </div>
    </div>
  )
}
