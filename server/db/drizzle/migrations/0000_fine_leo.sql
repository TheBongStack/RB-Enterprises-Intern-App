CREATE TYPE "public"."productType" AS ENUM('Appliances', 'Service', 'Sales', 'IT', 'N/A');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Products" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner" uuid NOT NULL,
	"name" varchar NOT NULL,
	"brand" varchar DEFAULT 'Generic',
	"type" "productType" DEFAULT 'N/A',
	"warrantyPeriod" bigint DEFAULT 31536000000,
	"warrantyStartDate" date DEFAULT now(),
	"price" integer DEFAULT 0,
	"outOfStock" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Profiles" (
	"owner" uuid PRIMARY KEY NOT NULL,
	"firstName" varchar(255),
	"lastName" varchar(255),
	"theme" varchar DEFAULT 'light' NOT NULL,
	"phoneNumber" integer DEFAULT 1000000000,
	"profilePhoto" varchar(255),
	CONSTRAINT "Profiles_owner_unique" UNIQUE("owner")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserSessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user" uuid NOT NULL,
	"lastLogin" timestamp DEFAULT now(),
	"cookie" varchar(512) DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"username" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"passwordHash" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "Users_username_unique" UNIQUE("username"),
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Products" ADD CONSTRAINT "Products_owner_Users_username_fk" FOREIGN KEY ("owner") REFERENCES "public"."Users"("username") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_owner_Users_username_fk" FOREIGN KEY ("owner") REFERENCES "public"."Users"("username") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserSessions" ADD CONSTRAINT "UserSessions_user_Users_username_fk" FOREIGN KEY ("user") REFERENCES "public"."Users"("username") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
