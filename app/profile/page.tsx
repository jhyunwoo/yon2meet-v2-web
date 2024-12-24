import DefaultLayout from "@/app/components/default-layout"
import Header from "@/app/components/header"
import SignOut from "@/app/components/auth/sign-out"
import { auth } from "@/auth"
import SignInWithKakao from "@/app/components/auth/sign-in-with-kakao"

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
    <DefaultLayout>
      <Header>프로필</Header>
      <div className={"w-full p-4"}>
        <SignOut />
      </div>
    </DefaultLayout>
  )
}
