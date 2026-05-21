import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { schema } from '@/server/db'

export const contactRouter = router({
  send: publicProcedure
    .input(z.object({
      name: z.string().min(1).max(100),
      email: z.string().email(),
      subject: z.string().max(200).optional(),
      message: z.string().min(1).max(5000),
    }))
    .mutation(async ({ ctx, input }) => {
      const [entry] = await ctx.db
        .insert(schema.contacts)
        .values(input)
        .returning()
      return entry
    }),
})
