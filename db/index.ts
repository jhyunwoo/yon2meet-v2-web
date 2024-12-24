import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as accountsSchema from "@/db/schema/accounts"
import * as authenticatorsSchema from "@/db/schema/authenticators"
import * as usersSchema from "@/db/schema/users"
import * as meetingsSchema from "@/db/schema/meetings"
import * as sessionsSchema from "@/db/schema/sessions"
import * as verificationTokensSchema from "@/db/schema/verification-tokens"
import * as schedulesSchema from "@/db/schema/schedules"
import * as usersToMeetingsSchema from "@/db/schema/users-to-meetings"

// for query purposes
const queryClient = postgres(process.env.AUTH_DRIZZLE_URL!)
const db = drizzle(queryClient, {
  schema: {
    ...accountsSchema,
    ...authenticatorsSchema,
    ...usersSchema,
    ...meetingsSchema,
    ...sessionsSchema,
    ...verificationTokensSchema,
    ...schedulesSchema,
    ...usersToMeetingsSchema,
  },
})

export default db
