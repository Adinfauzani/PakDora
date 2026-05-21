import { postRouter } from './routers/post'
import { guestbookRouter } from './routers/guestbook'
import { contactRouter } from './routers/contact'
import { router } from './trpc'

export const appRouter = router({
  post: postRouter,
  guestbook: guestbookRouter,
  contact: contactRouter,
})

export type AppRouter = typeof appRouter
