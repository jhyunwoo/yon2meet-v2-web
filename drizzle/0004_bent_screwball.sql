CREATE TABLE "schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"userId" text NOT NULL,
	"date" timestamp NOT NULL
);
