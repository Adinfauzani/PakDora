'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  MessageSquare,
  Star,
  Award,
  TrendingUp,
  Users,
  FileText,
  Sparkles,
  BarChart3,
  Network,
  Lightbulb,
  ChevronRight,
  GraduationCap,
} from 'lucide-react'
import CustomLink from '@/components/Link'
import { cn } from '@/lib/utils'
import { FadeInView, StaggerGrid, StaggerItem, GridPattern } from '@/components/animations'
import { getIcon } from '@/lib/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Profile } from '@/types/data'
import profileData from '@/data/profile.json'
import { allBlogs } from 'contentlayer/generated'

const profile = profileData as Profile

const iconComponentMap: Record<string, React.ElementType> = {
  'trending-up': TrendingUp,
  'file-text': FileText,
  'users': Users,
  'book-open': BookOpen,
  'bar-chart-3': BarChart3,
  network: Network,
  lightbulb: Lightbulb,
  star: Star,
  'graduation-cap': GraduationCap,
  award: Award,
}

const featuredPosts = allBlogs.filter((p) => p.published).slice(0, 3)

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
} as const

const floatingPositions: Record<string, string> = {
  'bottom-right': 'absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4',
  'top-left': 'absolute -left-3 -top-3 sm:-left-4 sm:-top-4',
  'bottom-left': 'absolute -bottom-10 -left-3 sm:-bottom-12 sm:-left-4',
}

export default function Main() {
  return (
    <main className="flex-1">
      {/* ─────────────── HERO ─────────────── */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-navy-400/10 blur-[120px]" />
          <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-gold-400/10 blur-[140px]" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-[100px]" />
          <GridPattern />
        </div>

        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid items-center gap-12 lg:grid-cols-5"
          >
            <motion.div variants={childVariants} className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-navy-50 px-4 py-1.5 text-xs font-medium text-navy-700 dark:bg-navy-900/40 dark:text-navy-200"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {profile.badge.label}
              </motion.div>

              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {profile.name.split(' ')[0]}{' '}
                <span className="bg-gradient-to-r from-navy via-gold to-navy bg-clip-text text-transparent">
                  {profile.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>

              <p className="mt-3 text-lg text-text-secondary dark:text-dark-text-secondary sm:text-xl">
                {profile.hero.role}
              </p>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
                {profile.hero.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild>
                  <CustomLink href={profile.hero.primaryButton.href}>
                    {profile.hero.primaryButton.label}
                    <ArrowRight className="h-4 w-4" />
                  </CustomLink>
                </Button>
                <Button variant="secondary" asChild>
                  <CustomLink href={profile.hero.secondaryButton.href}>
                    <BookOpen className="h-4 w-4" />
                    {profile.hero.secondaryButton.label}
                  </CustomLink>
                </Button>
                <Button variant="ghost" asChild>
                  <CustomLink href={profile.hero.tertiaryButton.href}>
                    <MessageSquare className="h-4 w-4" />
                    {profile.hero.tertiaryButton.label}
                  </CustomLink>
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:flex lg:flex-wrap"
              >
                {profile.stats.map((stat) => {
                  const Icon = iconComponentMap[
                    Object.keys(iconComponentMap).find((k) =>
                      stat.label.toLowerCase().includes(k.replace(/-/g, ''))
                    ) || 'trending-up'
                  ] || TrendingUp
                  return (
                    <div
                      key={stat.label}
                      className="card-base flex items-center gap-3 px-4 py-3"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 dark:bg-navy-900/40">
                        <Icon className="h-4 w-4 text-navy-600 dark:text-navy-300" />
                      </div>
                      <div>
                        <p className="font-display text-lg font-bold leading-none text-text-primary dark:text-dark-text-primary">
                          {stat.number}
                        </p>
                        <p className="mt-0.5 text-xs text-text-secondary dark:text-dark-text-secondary">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>

            <motion.div variants={childVariants} className="lg:col-span-2">
              <div className="relative mx-auto flex w-fit flex-col items-center justify-center">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-navy-300 via-gold-300 to-navy-500 opacity-25 blur-md"
                  style={{ padding: '6px' }}
                />

                <div className="relative flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-100 to-navy-200 dark:from-navy-800 dark:to-navy-900 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-navy-500/10 to-transparent" />
                  <span className="font-display text-6xl font-bold text-navy-400 dark:text-navy-300 sm:text-7xl lg:text-8xl">
                    {profile.initials}
                  </span>
                </div>

                {profile.floatingBadges.map((badge, i) => {
                  const Icon = iconComponentMap[badge.icon] || Star
                  return (
                    <motion.div
                      key={badge.label}
                      initial={{ opacity: 0, x: 16, y: 16 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                      className={cn(
                        'card-elevated flex items-center gap-2 rounded-xl px-4 py-2.5',
                        floatingPositions[badge.position]
                      )}
                    >
                      <Icon className={cn('h-4 w-4', badge.color === 'text-gold' ? 'fill-gold text-gold' : badge.color)} />
                      <span className="whitespace-nowrap text-xs font-semibold text-text-primary dark:text-dark-text-primary">
                        {badge.label}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── FEATURED ARTICLES ─────────────── */}
      {featuredPosts.length > 0 && (
        <section className="bg-[#f8fafc] py-20 dark:bg-dark-surface-secondary">
          <div className="container">
            <FadeInView>
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-navy dark:text-navy-300">
                    Latest
                  </span>
                  <h2 className="mt-1 font-display text-2xl font-bold text-text-primary dark:text-dark-text-primary sm:text-3xl">
                    Artikel Terbaru
                  </h2>
                  <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                    Tulisan terbaru seputar sains data, pendidikan, dan riset
                  </p>
                </div>
                <CustomLink
                  href="/blog"
                  className="hidden items-center gap-1 text-sm font-medium text-navy transition-colors hover:text-navy-600 sm:flex dark:text-navy-300 dark:hover:text-navy-200"
                >
                  Lihat Semua
                  <ChevronRight className="h-4 w-4" />
                </CustomLink>
              </div>
            </FadeInView>

            <StaggerGrid className="mt-10 grid gap-6 md:grid-cols-3">
              {featuredPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <CustomLink href={`/blog/${post.slug}`}>
                    <article className="card-hover group flex h-full flex-col">
                      <div className="flex aspect-[16/10] items-center justify-center rounded-xl bg-gradient-to-br from-navy-50 to-gold-50 dark:from-navy-900/30 dark:to-gold-900/10">
                        <FileText className="h-10 w-10 text-navy-300 dark:text-navy-600" />
                      </div>
                      <div className="mt-4 flex-1">
                        <div className="flex items-center gap-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                          <span>{new Date(post.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          <span>&middot;</span>
                          <span>{post.readingTime} menit</span>
                        </div>
                        <h3 className="mt-2 font-display text-base font-semibold leading-snug text-text-primary transition-colors group-hover:text-navy dark:text-dark-text-primary dark:group-hover:text-navy-300">
                          {post.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                          {post.summary}
                        </p>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="navy">{tag}</Badge>
                          ))}
                        </div>
                      )}
                    </article>
                  </CustomLink>
                </StaggerItem>
              ))}
            </StaggerGrid>

            <div className="mt-8 text-center sm:hidden">
              <CustomLink
                href="/blog"
                className="btn-secondary inline-flex items-center gap-2 text-sm"
              >
                Lihat Semua Artikel
                <ArrowRight className="h-4 w-4" />
              </CustomLink>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────── TEACHING FOCUS ─────────────── */}
      <section className="py-20">
        <div className="container">
          <FadeInView>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-navy dark:text-navy-300">
                  Expertise
                </span>
                <h2 className="mt-1 font-display text-2xl font-bold text-text-primary dark:text-dark-text-primary sm:text-3xl">
                  Teaching Focus
                </h2>
                <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                  Bidang pengajaran dan bimbingan utama
                </p>
              </div>
            </div>
          </FadeInView>

          <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {profile.expertise.map((item) => {
              const Icon = iconComponentMap[
                item.title.toLowerCase().includes('data') ? 'bar-chart-3' :
                item.title.toLowerCase().includes('intelligence') ? 'network' :
                item.title.toLowerCase().includes('mentoring') ? 'users' :
                'lightbulb'
              ] || Lightbulb
              return (
                <StaggerItem key={item.title}>
                  <div className="card-hover group h-full">
                    <div
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm',
                        item.gradient
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-text-primary dark:text-dark-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* ─────────────── QUOTE ─────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-navy-50 via-gold-50/30 to-navy-50 py-24 dark:from-navy-900/20 dark:via-gold-900/10 dark:to-navy-900/20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold-200/20 blur-3xl dark:bg-gold-500/5" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-navy-200/20 blur-3xl dark:bg-navy-500/5" />
        </div>
        <div className="container relative">
          <FadeInView>
            <figure className="mx-auto max-w-3xl text-center">
              <svg
                className="mx-auto h-10 w-10 text-navy-300 dark:text-navy-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>
              <blockquote className="mt-6 font-display text-xl font-medium leading-relaxed text-text-primary dark:text-dark-text-primary sm:text-2xl">
                &ldquo;{profile.about.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-text-secondary dark:text-dark-text-secondary">
                &mdash; {profile.name}
              </figcaption>
            </figure>
          </FadeInView>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="relative overflow-hidden bg-navy py-24 dark:bg-navy-900">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-navy-600/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-navy-700/20 blur-3xl" />
        </div>
        <div className="container relative">
          <FadeInView>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                {profile.cta.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-200">
                {profile.cta.description}
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button variant="gold" asChild>
                  <CustomLink href={profile.cta.primaryButton.href}>
                    <MessageSquare className="h-4 w-4" />
                    {profile.cta.primaryButton.label}
                  </CustomLink>
                </Button>
                <Button variant="outline" className="border-navy-400 text-white hover:bg-navy-800" asChild>
                  <CustomLink href={profile.cta.secondaryButton.href}>
                    {profile.cta.secondaryButton.label}
                    <ArrowRight className="h-4 w-4" />
                  </CustomLink>
                </Button>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>
    </main>
  )
}
