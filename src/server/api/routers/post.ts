import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { schema } from '@/server/db'
import { eq, desc } from 'drizzle-orm'

export const postRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db
      .select()
      .from(schema.blogPosts)
      .where(eq(schema.blogPosts.published, true))
      .orderBy(desc(schema.blogPosts.createdAt))
    return posts
  }),
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const [post] = await ctx.db
        .select()
        .from(schema.blogPosts)
        .where(eq(schema.blogPosts.slug, input.slug))
      return post ?? null
    }),
  featured: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db
      .select()
      .from(schema.blogPosts)
      .where(eq(schema.blogPosts.featured, true))
      .orderBy(desc(schema.blogPosts.createdAt))
      .limit(3)
    return posts
  }),
})
