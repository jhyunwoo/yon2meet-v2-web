ALTER TABLE "usersToMeetings" DROP CONSTRAINT "usersToMeetings_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "usersToMeetings" ADD CONSTRAINT "usersToMeetings_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;