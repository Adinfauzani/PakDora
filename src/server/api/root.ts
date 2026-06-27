import { postRouter } from './routers/post'
import { guestbookRouter } from './routers/guestbook'
import { contactRouter } from './routers/contact'
import { learningRouter } from './routers/learning'
import { router } from './trpc'

export const appRouter = router({
  post: postRouter,
  guestbook: guestbookRouter,
  contact: contactRouter,
  learning: learningRouter,
})

export type AppRouter = typeof appRouter
