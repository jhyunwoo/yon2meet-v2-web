import db from "@/db"
import { meetings } from "@/db/schema/meetings"
import { eq } from "drizzle-orm"

export default async function getMeetingData(id: string) {
  return (
    await db.select().from(meetings).where(eq(meetings.id, id)).limit(1)
  )[0]
}
