'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, Tag, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { api } from '@/trpc/react'
import { Badge } from '@/components/ui/badge'
import { FadeInView } from '@/components/animations'

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const { data: post, isLoading } = api.post.bySlug.useQuery({ slug })

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy border-t-transparent" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <AlertTriangle className="h-12 w-12 text-gold-400" />
        <h1 className="mt-4 font-display text-2xl font-bold text-text-primary dark:text-dark-text-primary">
          Artikel Tidak Ditemukan
        </h1>
        <Link
          href="/blog"
          className="btn-ghost mt-4 inline-flex items-center gap-2 text-navy dark:text-navy-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Blog
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <article className="container py-24">
        <FadeInView>
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <header className="max-w-3xl">
            <h1 className="font-display text-3xl font-bold leading-tight text-text-primary dark:text-dark-text-primary sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-text-secondary dark:text-dark-text-secondary">
              {post.summary}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-text-tertiary dark:text-dark-text-tertiary">
              {post.createdAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
              {post.readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime} menit baca
                </span>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="navy">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          <div className="mt-12 max-w-3xl">
            <div className="prose prose-base max-w-none dark:prose-invert prose-headings:font-display prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary prose-a:text-navy prose-code:rounded-lg prose-code:bg-navy-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono prose-pre:rounded-2xl prose-pre:border prose-pre:border-border prose-pre:bg-navy-50 prose-img:rounded-2xl dark:prose-headings:text-dark-text-primary dark:prose-p:text-dark-text-secondary dark:prose-strong:text-dark-text-primary dark:prose-a:text-navy-300 dark:prose-code:bg-navy-900/30 dark:prose-pre:border-dark-border dark:prose-pre:bg-navy-900/20">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content || ''}
              </ReactMarkdown>
            </div>
          </div>
        </FadeInView>
      </article>
    </div>
  )
}
