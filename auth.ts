import NextAuth from "next-auth"
import Kakao from "next-auth/providers/kakao"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import db from "@/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Kakao],
})
