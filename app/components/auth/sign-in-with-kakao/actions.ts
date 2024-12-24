"use server"

import { signIn } from "@/auth"
import { redirect } from "next/navigation"

export async function singInWithKakao(redirectUrl: string) {
  await signIn("kakao")
  redirect(redirectUrl)
}
