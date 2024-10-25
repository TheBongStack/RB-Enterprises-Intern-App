CREATE TABLE IF NOT EXISTS "Products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"owner" varchar NOT NULL,
	"price" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Profiles" (
	"owner" varchar PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255),
	"theme" varchar DEFAULT 'light' NOT NULL,
	"phNo" integer DEFAULT 1000000000,
	"pfp" varchar,
	CONSTRAINT "Profiles_owner_unique" UNIQUE("owner")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"username" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"passwordHash" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Users_username_unique" UNIQUE("username"),
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
