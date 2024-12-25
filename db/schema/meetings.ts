import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { usersToMeetings } from "@/db/schema/users-to-meetings"

export const meetings = pgTable("meeting", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("meeting").notNull().default("새로운 미팅"),
  startDate: timestamp("startDate", { withTimezone: true }).notNull(),
  endDate: timestamp("endDate", { withTimezone: true }).notNull(),
})

export const meetingsRelations = relations(meetings, ({ many }) => ({
  usersToMeetings: many(usersToMeetings),
}))
