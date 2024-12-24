import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { users } from "@/db/schema/users"

export const scheduleTypeEnum = pgEnum("scheduleType", ["never", "modifiable"])

export const schedules = pgTable("schedules", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  userId: text("userId").notNull(),
  date: timestamp("date").notNull(),
  type: scheduleTypeEnum("type").notNull().default("never"),
})

export const schedulesRelations = relations(schedules, ({ one }) => ({
  user: one(users, {
    fields: [schedules.userId],
    references: [users.id],
  }),
}))
