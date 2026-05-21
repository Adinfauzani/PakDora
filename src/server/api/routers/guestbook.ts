import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { schema } from '@/server/db'
import { eq, desc } from 'drizzle-orm'

export const guestbookRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
    const entries = await ctx.db
      .select()
      .from(schema.guestbookEntries)
      .where(eq(schema.guestbookEntries.approved, true))
      .orderBy(desc(schema.guestbookEntries.createdAt))
    return entries
  }),
  add: publicProcedure
    .input(z.object({
      name: z.string().min(1).max(100),
      message: z.string().min(1).max(1000),
      email: z.string().email().optional(),
      githubUsername: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const [entry] = await ctx.db
        .insert(schema.guestbookEntries)
        .values({ ...input, approved: false })
        .returning()
      return entry
    }),
})
