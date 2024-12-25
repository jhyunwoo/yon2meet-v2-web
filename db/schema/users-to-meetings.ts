import { pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core"
import { users } from "@/db/schema/users"
import { meetings } from "@/db/schema/meetings"
import { relations } from "drizzle-orm"

export const usersToMeetings = pgTable(
  "usersToMeetings",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, {
        onUpdate: "cascade",
        onDelete: "cascade",
      }),
    meetingId: uuid("meetingId")
      .notNull()
      .references(() => meetings.id, {
        onUpdate: "cascade",
        onDelete: "cascade",
      }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.meetingId] }),
  })
)

export const usersToMeetingsRelations = relations(
  usersToMeetings,
  ({ one }) => ({
    meetings: one(meetings, {
      fields: [usersToMeetings.meetingId],
      references: [meetings.id],
    }),
    user: one(users, {
      fields: [usersToMeetings.userId],
      references: [users.id],
    }),
  })
)
