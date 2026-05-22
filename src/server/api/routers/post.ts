import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { schema } from '@/server/db'
import { eq, desc } from 'drizzle-orm'

export const postRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.db) return []
    const posts = await ctx.db
      .select()
      .from(schema.blogPosts)
      .where(eq(schema.blogPosts.published, true))
      .orderBy(desc(schema.blogPosts.createdAt))
    return posts
  }),
  allAdmin: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.db) return []
    const posts = await ctx.db
      .select()
      .from(schema.blogPosts)
      .orderBy(desc(schema.blogPosts.createdAt))
    return posts
  }),
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.db) return null
      const [post] = await ctx.db
        .select()
        .from(schema.blogPosts)
        .where(eq(schema.blogPosts.slug, input.slug))
      return post ?? null
    }),
  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.db) return null
      const [post] = await ctx.db
        .select()
        .from(schema.blogPosts)
        .where(eq(schema.blogPosts.id, input.id))
      return post ?? null
    }),
  featured: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.db) return []
    const posts = await ctx.db
      .select()
      .from(schema.blogPosts)
      .where(eq(schema.blogPosts.featured, true))
      .orderBy(desc(schema.blogPosts.createdAt))
      .limit(3)
    return posts
  }),
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      slug: z.string().min(1),
      summary: z.string().min(1),
      content: z.string().optional(),
      tags: z.array(z.string()).optional(),
      published: z.boolean().default(false),
      featured: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db) throw new Error('Database not configured')
      const readingTime = Math.ceil(
        (input.content || '').split(/\s+/).filter(Boolean).length / 200
      )
      const [post] = await ctx.db
        .insert(schema.blogPosts)
        .values({ ...input, readingTime })
        .returning()
      return post
    }),
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().min(1).optional(),
      slug: z.string().min(1).optional(),
      summary: z.string().min(1).optional(),
      content: z.string().optional(),
      tags: z.array(z.string()).optional(),
      published: z.boolean().optional(),
      featured: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db) throw new Error('Database not configured')
      const { id, ...data } = input
      const updateData: Record<string, unknown> = { ...data, updatedAt: new Date() }
      if (data.content) {
        updateData.readingTime = Math.ceil(
          data.content.split(/\s+/).filter(Boolean).length / 200
        )
      }
      const [post] = await ctx.db
        .update(schema.blogPosts)
        .set(updateData)
        .where(eq(schema.blogPosts.id, id))
        .returning()
      return post
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db) throw new Error('Database not configured')
      await ctx.db
        .delete(schema.blogPosts)
        .where(eq(schema.blogPosts.id, input.id))
      return { success: true }
    }),
})
