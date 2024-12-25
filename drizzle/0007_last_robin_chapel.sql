ALTER TABLE "usersToMeetings" DROP CONSTRAINT "usersToMeetings_meetingId_meeting_id_fk";
--> statement-breakpoint
ALTER TABLE "usersToMeetings" ADD CONSTRAINT "usersToMeetings_meetingId_meeting_id_fk" FOREIGN KEY ("meetingId") REFERENCES "public"."meeting"("id") ON DELETE cascade ON UPDATE cascade;