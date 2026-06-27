import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { schema } from '@/server/db'
import { eq, desc } from 'drizzle-orm'
import type { LearningVideo, LearningResource, VideoType } from '@/types/learning'

const resourceSchema = z.object({
  title: z.string(),
  url: z.string(),
  type: z.enum(['slide', 'pdf', 'dataset', 'github', 'link']),
})

const videoTypeSchema = z.enum(['youtube', 'drive', 'upload'])

const insertSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  thumbnail: z.string().optional(),
  videoType: videoTypeSchema.default('youtube'),
  videoUrl: z.string().min(1),
  duration: z.string().min(1),
  category: z.string().min(1),
  level: z.enum(['Pemula', 'Menengah', 'Lanjutan']),
  tags: z.array(z.string()).optional(),
  resources: z.array(resourceSchema).optional().default([]),
  transcript: z.string().optional(),
  estimatedTime: z.string().optional(),
  viewCount: z.number().optional(),
  publishedAt: z.string().min(1),
}).transform((data) => ({
  ...data,
  youtubeId: data.videoType === 'youtube' ? data.videoUrl : '-',
  resources: data.resources.length > 0 ? JSON.stringify(data.resources) : null,
}))

const updateSchema = z.object({
  id: z.number(),
  slug: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  thumbnail: z.string().optional(),
  videoType: videoTypeSchema.optional(),
  videoUrl: z.string().min(1).optional(),
  duration: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  level: z.enum(['Pemula', 'Menengah', 'Lanjutan']).optional(),
  tags: z.array(z.string()).optional(),
  resources: z.array(resourceSchema).optional(),
  transcript: z.string().optional(),
  estimatedTime: z.string().optional(),
  viewCount: z.number().optional(),
  publishedAt: z.string().min(1).optional(),
}).transform((data) => {
  const { id, ...rest } = data
  const transformed = { ...rest } as Record<string, unknown>
  if (transformed.resources) {
    transformed.resources = JSON.stringify(transformed.resources)
  }
  if (transformed.videoType === 'youtube' && transformed.videoUrl) {
    transformed.youtubeId = transformed.videoUrl
  } else if (transformed.videoType && transformed.videoType !== 'youtube') {
    transformed.youtubeId = '-'
  }
  return { id, data: transformed }
})

export const learningRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.db) return [] as LearningVideo[]
    const rows = await ctx.db
      .select()
      .from(schema.learningVideos)
      .orderBy(desc(schema.learningVideos.publishedAt))
    return rows.map(toVideo)
  }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.db) return null as LearningVideo | null
      const [row] = await ctx.db
        .select()
        .from(schema.learningVideos)
        .where(eq(schema.learningVideos.slug, input.slug))
      return row ? toVideo(row) : null
    }),

  create: protectedProcedure
    .input(insertSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db) throw new Error('Database not configured')
      const [row] = await ctx.db
        .insert(schema.learningVideos)
        .values(input)
        .returning()
      return toVideo(row)
    }),

  update: protectedProcedure
    .input(updateSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db) throw new Error('Database not configured')
      const { id, data } = input
      const [row] = await ctx.db
        .update(schema.learningVideos)
        .set({ ...data, updatedAt: new Date() } as Record<string, unknown>)
        .where(eq(schema.learningVideos.id, id))
        .returning()
      return toVideo(row)
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db) throw new Error('Database not configured')
      await ctx.db
        .delete(schema.learningVideos)
        .where(eq(schema.learningVideos.id, input.id))
      return { success: true }
    }),
})

function toVideo(row: Record<string, unknown>): LearningVideo {
  let resources: LearningResource[] = []
  if (typeof row.resources === 'string') {
    try {
      resources = JSON.parse(row.resources)
    } catch {
      resources = []
    }
  }
  return {
    id: row.id as number,
    slug: row.slug as string,
    title: row.title as string,
    description: row.description as string,
    thumbnail: (row.thumbnail as string) ?? '',
    videoType: (row.videoType as VideoType) ?? 'youtube',
    videoUrl: (row.videoUrl as string) ?? (row.youtubeId as string) ?? '',
    duration: row.duration as string,
    category: row.category as string,
    level: row.level as LearningVideo['level'],
    tags: (row.tags as string[]) ?? [],
    resources,
    transcript: (row.transcript as string) ?? undefined,
    estimatedTime: (row.estimatedTime as string) ?? undefined,
    viewCount: (row.viewCount as number) ?? undefined,
    publishedAt: row.publishedAt as string,
  }
}
