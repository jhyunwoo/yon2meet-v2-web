ALTER TABLE "users_to_groups" RENAME TO "usersToMeetings";--> statement-breakpoint
ALTER TABLE "usersToMeetings" DROP CONSTRAINT "users_to_groups_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "usersToMeetings" DROP CONSTRAINT "users_to_groups_meetingId_meeting_id_fk";
--> statement-breakpoint
ALTER TABLE "usersToMeetings" DROP CONSTRAINT "users_to_groups_userId_meetingId_pk";--> statement-breakpoint
ALTER TABLE "usersToMeetings" ADD CONSTRAINT "usersToMeetings_userId_meetingId_pk" PRIMARY KEY("userId","meetingId");--> statement-breakpoint
ALTER TABLE "usersToMeetings" ADD CONSTRAINT "usersToMeetings_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usersToMeetings" ADD CONSTRAINT "usersToMeetings_meetingId_meeting_id_fk" FOREIGN KEY ("meetingId") REFERENCES "public"."meeting"("id") ON DELETE no action ON UPDATE no action;