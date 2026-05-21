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
  Quote,
  ExternalLink,
} from 'lucide-react'
import CustomLink from '@/components/Link'
import { FadeInView, StaggerGrid, StaggerItem, MeshGradient } from '@/components/animations'
import { Badge } from '@/components/ui/badge'
import type { Profile } from '@/types/data'
import profileData from '@/data/profile.json'
import { api } from '@/trpc/react'

const profile = profileData as Profile

const iconMap: Record<string, React.ElementType> = {
  'trending-up': TrendingUp,
  'file-text': FileText,
  users: Users,
  'book-open': BookOpen,
  'bar-chart-3': BarChart3,
  network: Network,
  lightbulb: Lightbulb,
  star: Star,
  'graduation-cap': GraduationCap,
  award: Award,
}

export default function Main() {
  const { data: featuredPosts } = api.post.featured.useQuery()
  const posts = featuredPosts ?? []

  return (
    <main className="flex-1">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <MeshGradient />
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-navy-500/5 blur-[150px] dark:bg-navy-400/10" />
          <div className="absolute -bottom-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-gold-500/5 blur-[150px] dark:bg-gold-400/8" />
          <div className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-emerald-500/3 blur-[120px] dark:bg-emerald-400/5" />
        </div>

        <div className="container relative pt-28 pb-20">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            {/* ── LEFT: Content ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-navy/20 bg-navy/5 px-4 py-1.5 text-xs font-medium text-navy-700 dark:border-navy-400/20 dark:bg-navy-400/10 dark:text-navy-200"
              >
                <Sparkles className="h-3 w-3" />
                {profile.badge.label}
              </motion.div>

              <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                <span className="text-text-primary dark:text-dark-text-primary">{profile.name.split(' ')[0]} </span>
                <span className="bg-gradient-to-r from-navy via-gold to-navy bg-clip-text text-transparent">
                  {profile.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>

              <p className="mt-4 text-lg font-medium text-text-primary/80 dark:text-dark-text-primary/80 sm:text-xl">
                {profile.hero.role}
              </p>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
                {profile.hero.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <CustomLink
                  href={profile.hero.primaryButton.href}
                  className="group inline-flex h-11 items-center gap-2 rounded-full bg-navy px-6 text-sm font-medium text-white transition-all hover:bg-navy-700 hover:shadow-glow active:scale-[0.97]"
                >
                  {profile.hero.primaryButton.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </CustomLink>
                <CustomLink
                  href={profile.hero.secondaryButton.href}
                  className="group inline-flex h-11 items-center gap-2 rounded-full border border-border/60 bg-transparent px-6 text-sm font-medium text-text-primary transition-all hover:border-navy/30 hover:bg-navy/5 active:scale-[0.97] dark:border-dark-border/60 dark:text-dark-text-primary dark:hover:border-navy-400/30 dark:hover:bg-navy-400/5"
                >
                  <BookOpen className="h-4 w-4" />
                  {profile.hero.secondaryButton.label}
                </CustomLink>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 flex flex-wrap gap-3"
              >
                {profile.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="group relative rounded-2xl border border-border/50 bg-white/40 px-4 py-3 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-md dark:border-dark-border/30 dark:bg-dark-surface-card/40 dark:hover:border-navy-400/20"
                  >
                    <p className="font-display text-lg font-bold tracking-tight text-text-primary dark:text-dark-text-primary">
                      {stat.number}
                    </p>
                    <p className="mt-0.5 whitespace-nowrap text-[11px] font-medium text-text-secondary dark:text-dark-text-secondary">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Avatar + badges ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto flex w-fit flex-col items-center justify-center">
                {/* Glow ring */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-navy-400/30 via-gold-400/20 to-navy-500/30 opacity-60 blur-xl"
                  style={{ padding: '8px' }}
                />

                {/* Avatar placeholder */}
                <div className="relative flex h-64 w-64 items-center justify-center rounded-[2rem] bg-gradient-to-br from-navy-100 via-navy-200/80 to-gold-100/50 shadow-xl sm:h-72 sm:w-72 lg:h-80 lg:w-80 dark:from-navy-900 dark:via-navy-800 dark:to-navy-900/80">
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-navy-500/10 via-transparent to-gold-500/10" />
                  <span className="font-display text-6xl font-bold tracking-tight text-navy-400/80 sm:text-7xl lg:text-8xl dark:text-navy-300/60">
                    {profile.initials}
                  </span>
                </div>

                {/* Floating badges */}
                {profile.floatingBadges.map((badge, i) => {
                  const Icon = iconMap[badge.icon] || Star
                  const positions = [
                    'absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4',
                    'absolute -left-3 -top-3 sm:-left-4 sm:-top-4',
                    'absolute -bottom-12 -left-3 sm:-bottom-14 sm:-left-4',
                  ]
                  const delays = [0.7, 0.85, 1.0]
                  return (
                    <motion.div
                      key={badge.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: delays[i],
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`${positions[i]} flex items-center gap-2 rounded-xl border border-border/50 bg-white/80 px-4 py-2.5 shadow-elevated backdrop-blur-md dark:border-dark-border/40 dark:bg-dark-surface-card/80`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          badge.color === 'text-gold'
                            ? 'fill-gold text-gold'
                            : badge.color === 'text-emerald'
                              ? 'text-emerald'
                              : 'text-navy-500'
                        }`}
                      />
                      <span className="whitespace-nowrap text-xs font-semibold text-text-primary dark:text-dark-text-primary">
                        {badge.label}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED ARTICLES ═══════════════ */}
      {posts.length > 0 && (
        <section className="relative border-t border-border/40 py-24 dark:border-dark-border/30">
          <MeshGradient />
          <div className="container">
            <FadeInView>
              <div className="flex items-end justify-between">
                <div>
                  <span className="section-label">Latest</span>
                  <h2 className="mt-2 heading-md text-text-primary dark:text-dark-text-primary">
                    Artikel Terbaru
                  </h2>
                  <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                    Tulisan terbaru seputar sains data, pendidikan, dan riset
                  </p>
                </div>
                <CustomLink
                  href="/blog"
                  className="group hidden items-center gap-1 text-sm font-medium text-navy transition-colors hover:text-navy-600 sm:flex dark:text-navy-300 dark:hover:text-navy-200"
                >
                  Lihat Semua
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </CustomLink>
              </div>
            </FadeInView>

            <StaggerGrid className="mt-10 grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <CustomLink href={`/blog/${post.slug}`}>
                    <article className="glow-card group flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-white/50 p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-hover dark:border-dark-border/30 dark:bg-dark-surface-card/50">
                      <div className="flex aspect-[16/10] items-center justify-center rounded-xl bg-gradient-to-br from-navy-50/80 to-gold-50/80 dark:from-navy-900/30 dark:to-gold-900/10">
                        <FileText className="h-10 w-10 text-navy-300/60 dark:text-navy-600/60" />
                      </div>
                      <div className="mt-4 flex-1">
                        <div className="flex items-center gap-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                          <span>
                            {new Date(post.createdAt!).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                          <span>&middot;</span>
                          <span>{post.readingTime} menit</span>
                        </div>
                        <h3 className="mt-2 font-display text-base font-semibold leading-snug text-text-primary transition-colors group-hover:text-navy dark:text-dark-text-primary dark:group-hover:text-navy-300">
                          {post.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                          {post.summary}
                        </p>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="navy">
                              {tag}
                            </Badge>
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

      {/* ═══════════════ EXPERTISE ═══════════════ */}
      <section className="relative py-24">
        <MeshGradient />
        <div className="container">
          <FadeInView>
            <div>
              <span className="section-label">Expertise</span>
              <h2 className="mt-2 heading-md text-text-primary dark:text-dark-text-primary">
                Teaching Focus
              </h2>
              <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                Bidang pengajaran dan bimbingan utama
              </p>
            </div>
          </FadeInView>

          <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {profile.expertise.map((item) => {
              const Icon =
                iconMap[
                  item.title.toLowerCase().includes('data')
                    ? 'bar-chart-3'
                    : item.title.toLowerCase().includes('intelligence')
                      ? 'network'
                      : item.title.toLowerCase().includes('leadership')
                        ? 'users'
                        : 'lightbulb'
                ] || Lightbulb
              return (
                <StaggerItem key={item.title}>
                  <div className="glow-card group h-full rounded-2xl border border-border/50 bg-white/40 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-hover dark:border-dark-border/30 dark:bg-dark-surface-card/40">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm ${item.gradient}`}
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

      {/* ═══════════════ QUOTE ═══════════════ */}
      <section className="relative overflow-hidden border-y border-border/40 py-28 dark:border-dark-border/30">
        <MeshGradient />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold-200/20 blur-3xl dark:bg-gold-500/5" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-navy-200/20 blur-3xl dark:bg-navy-500/5" />
        </div>
        <div className="container relative">
          <FadeInView>
            <figure className="mx-auto max-w-3xl text-center">
              <Quote className="mx-auto h-10 w-10 text-navy-300/50 dark:text-navy-600/50" />
              <blockquote className="mt-6 font-display text-xl font-medium leading-relaxed text-text-primary dark:text-dark-text-primary sm:text-2xl">
                &ldquo;{profile.about.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-center gap-3 text-sm">
                <span className="h-px w-8 bg-border dark:bg-dark-border" />
                <span className="font-medium text-text-secondary dark:text-dark-text-secondary">
                  {profile.name}
                </span>
                <span className="h-px w-8 bg-border dark:bg-dark-border" />
              </figcaption>
            </figure>
          </FadeInView>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="relative overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/5 to-navy/10 dark:via-navy-900/20 dark:to-navy-900/30" />
        <div className="container relative">
          <FadeInView>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="heading-md text-text-primary dark:text-dark-text-primary">
                {profile.cta.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                {profile.cta.description}
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <CustomLink
                  href={profile.cta.primaryButton.href}
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-gold px-7 text-sm font-medium text-navy-900 transition-all hover:bg-gold-500 hover:shadow-lg active:scale-[0.97]"
                >
                  <MessageSquare className="h-4 w-4" />
                  {profile.cta.primaryButton.label}
                </CustomLink>
                <CustomLink
                  href={profile.cta.secondaryButton.href}
                  className="group inline-flex h-12 items-center gap-2 rounded-full border border-navy/20 bg-transparent px-7 text-sm font-medium text-text-primary transition-all hover:border-navy/40 hover:bg-navy/5 active:scale-[0.97] dark:border-navy-400/20 dark:text-dark-text-primary dark:hover:border-navy-400/40 dark:hover:bg-navy-400/5"
                >
                  {profile.cta.secondaryButton.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </CustomLink>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>
    </main>
  )
}
