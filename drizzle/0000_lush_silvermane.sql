CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"summary" text NOT NULL,
	"content" text,
	"tags" varchar(255)[],
	"published" boolean DEFAULT false,
	"featured" boolean DEFAULT false,
	"reading_time" integer,
	"image" varchar(512),
	"author_id" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subject" varchar(255),
	"message" text NOT NULL,
	"read" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "guestbook_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"email" varchar(255),
	"github_username" varchar(255),
	"approved" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "learning_videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"thumbnail" varchar(512),
	"youtube_id" varchar(64) NOT NULL,
	"duration" varchar(16) NOT NULL,
	"category" varchar(64) NOT NULL,
	"level" varchar(16) DEFAULT 'Pemula' NOT NULL,
	"tags" varchar(255)[],
	"resources" text,
	"transcript" text,
	"estimated_time" varchar(64),
	"view_count" integer DEFAULT 0,
	"published_at" varchar(16) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "learning_videos_slug_unique" UNIQUE("slug")
);
