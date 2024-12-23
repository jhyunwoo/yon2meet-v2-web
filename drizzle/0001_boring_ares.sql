CREATE TABLE "meeting" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"meeting" text DEFAULT '새로운 미팅' NOT NULL,
	"startDate" date NOT NULL,
	"endDate" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_to_groups" (
	"userId" text NOT NULL,
	"meetingId" uuid NOT NULL,
	CONSTRAINT "users_to_groups_userId_meetingId_pk" PRIMARY KEY("userId","meetingId")
);
--> statement-breakpoint
ALTER TABLE "users_to_groups" ADD CONSTRAINT "users_to_groups_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_groups" ADD CONSTRAINT "users_to_groups_meetingId_meeting_id_fk" FOREIGN KEY ("meetingId") REFERENCES "public"."meeting"("id") ON DELETE no action ON UPDATE no action;