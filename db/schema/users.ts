import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { usersToMeetings } from "@/db/schema/users-to-meetings"
import { schedules } from "@/db/schema/schedules"

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})

export const usersRelations = relations(users, ({ many }) => ({
  usersToMeetings: many(usersToMeetings),
  schedules: many(schedules),
}))
