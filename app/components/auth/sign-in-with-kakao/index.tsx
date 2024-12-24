import KakaoLoginButton from "@/app/components/auth/sign-in-with-kakao/button"
import { singInWithKakao } from "@/app/components/auth/sign-in-with-kakao/actions"

export default function SignInWithKakao({ redirect }: { redirect: string }) {
  const signInWithKakaoWithRedirect = singInWithKakao.bind(null, redirect)

  return (
    <form action={signInWithKakaoWithRedirect}>
      <KakaoLoginButton />
    </form>
  )
}
