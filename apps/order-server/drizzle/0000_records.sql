CREATE TABLE "records" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"note" text,
	"analytics" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
