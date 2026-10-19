CREATE TABLE "telegram_subscribers" (
	"chat_id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
