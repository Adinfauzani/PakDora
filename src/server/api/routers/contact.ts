import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { schema } from '@/server/db'
import { desc } from 'drizzle-orm'

export const contactRouter = router({
  all: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.db) return []
    return await ctx.db
      .select()
      .from(schema.contacts)
      .orderBy(desc(schema.contacts.createdAt))
  }),
  send: publicProcedure
    .input(z.object({
      name: z.string().min(1).max(100),
      email: z.string().email(),
      subject: z.string().max(200).optional(),
      message: z.string().min(1).max(5000),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db) throw new Error('Database not configured')
      const [entry] = await ctx.db
        .insert(schema.contacts)
        .values(input)
        .returning()
      return entry
    }),
})
