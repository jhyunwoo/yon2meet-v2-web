import { signOutAction } from "@/app/components/auth/sign-out/actions"
import SignOutButton from "@/app/components/auth/sign-out/button"

export default function SignOut() {
  return (
    <form action={signOutAction}>
      <SignOutButton />
    </form>
  )
}
