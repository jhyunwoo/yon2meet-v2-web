import { date, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { usersToMeetings } from '@/db/schema/users-to-meetings'

export const meetings = pgTable('meeting', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('meeting').notNull().default('새로운 미팅'),
  startDate: date('startDate', { mode: 'date' }).notNull(),
  endDate: date('endDate', { mode: 'date' }).notNull(),
})

export const meetingsRelations = relations(meetings, ({ many }) => ({
  usersToGroups: many(usersToMeetings),
}))
