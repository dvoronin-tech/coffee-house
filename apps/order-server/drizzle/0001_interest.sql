CREATE TYPE "public"."interest" AS ENUM('subscription', 'one_time', 'question');--> statement-breakpoint
ALTER TABLE "records" ADD COLUMN "interest" "interest" NOT NULL;
