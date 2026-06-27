import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
} from 'drizzle-orm/pg-core'

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  summary: text('summary').notNull(),
  content: text('content'),
  tags: varchar('tags', { length: 255 }).array(),
  published: boolean('published').default(false),
  featured: boolean('featured').default(false),
  readingTime: integer('reading_time'),
  image: varchar('image', { length: 512 }),
  authorId: varchar('author_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const guestbookEntries = pgTable('guestbook_entries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  message: text('message').notNull(),
  email: varchar('email', { length: 255 }),
  githubUsername: varchar('github_username', { length: 255 }),
  approved: boolean('approved').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }),
  message: text('message').notNull(),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

export const learningVideos = pgTable('learning_videos', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  thumbnail: varchar('thumbnail', { length: 512 }),
  videoType: varchar('video_type', { length: 16 }).notNull().default('youtube'),
  videoUrl: varchar('video_url', { length: 1024 }),
  youtubeId: varchar('youtube_id', { length: 64 }),
  duration: varchar('duration', { length: 16 }).notNull(),
  category: varchar('category', { length: 64 }).notNull(),
  level: varchar('level', { length: 16 }).notNull().default('Pemula'),
  tags: varchar('tags', { length: 255 }).array(),
  resources: text('resources'),
  transcript: text('transcript'),
  estimatedTime: varchar('estimated_time', { length: 64 }),
  viewCount: integer('view_count').default(0),
  publishedAt: varchar('published_at', { length: 16 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
