DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typnamespace = 'public'::regnamespace AND typname = 'category') THEN
        CREATE TYPE "category" AS ENUM ('Feature', 'UI', 'UX', 'Enhancement', 'Bug');
    END IF;
END $$;
--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typnamespace = 'public'::regnamespace AND typname = 'status') THEN
        CREATE TYPE "status" AS ENUM ('Suggestion', 'Planned', 'In-Progress', 'Live');
    END IF;
END $$;
--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relnamespace = 'public'::regnamespace AND relname = 'comments') THEN
        CREATE TABLE "comments" (
            "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
            "feedback_id" uuid NOT NULL,
            "content" text NOT NULL,
            "user_id" uuid NOT NULL,
            "created_at" timestamp DEFAULT now() NOT NULL
        );
    END IF;
END $$;
--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relnamespace = 'public'::regnamespace AND relname = 'feedbacks') THEN
        CREATE TABLE "feedbacks" (
            "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
            "category" "category" NOT NULL,
            "title" text NOT NULL,
            "upvotes_count" integer DEFAULT 0 NOT NULL,
            "status" "status" DEFAULT 'Suggestion' NOT NULL,
            "description" text NOT NULL,
            "user_id" uuid NOT NULL,
            "created_at" timestamp DEFAULT now() NOT NULL
        );
    END IF;
END $$;
--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relnamespace = 'public'::regnamespace AND relname = 'replies') THEN
        CREATE TABLE "replies" (
            "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
            "content" text NOT NULL,
            "replying_to" text NOT NULL,
            "comment_id" uuid NOT NULL,
            "user_id" uuid NOT NULL,
            "created_at" timestamp DEFAULT now() NOT NULL
        );
    END IF;
END $$;
--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relnamespace = 'public'::regnamespace AND relname = 'upvotes') THEN
        CREATE TABLE "upvotes" (
            "feedback_id" uuid NOT NULL,
            "user_id" uuid NOT NULL,
            "created_at" timestamp DEFAULT now() NOT NULL,
            CONSTRAINT "upvotes_user_id_feedback_id_pk" PRIMARY KEY("user_id","feedback_id")
        );
    END IF;
END $$;
--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relnamespace = 'public'::regnamespace AND relname = 'users') THEN
        CREATE TABLE "users" (
            "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
            "name" text NOT NULL,
            "username" text NOT NULL,
            "password" text NOT NULL,
            "image" text,
            "created_at" timestamp DEFAULT now() NOT NULL
        );
    END IF;
END $$;

--> statement-breakpoint
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_feedback_id_fkey" FOREIGN KEY ("feedback_id") REFERENCES "feedbacks" ("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "replies" ADD CONSTRAINT "replies_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments" ("id");
ALTER TABLE "replies" ADD CONSTRAINT "replies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "upvotes" ADD CONSTRAINT "upvotes_feedback_id_fkey" FOREIGN KEY ("feedback_id") REFERENCES "feedbacks" ("id");
ALTER TABLE "upvotes" ADD CONSTRAINT "upvotes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id");