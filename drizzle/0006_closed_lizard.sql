CREATE TYPE "public"."scheduleType" AS ENUM('never', 'modifiable');--> statement-breakpoint
ALTER TABLE "schedules" ADD COLUMN "type" "scheduleType" DEFAULT 'never' NOT NULL;