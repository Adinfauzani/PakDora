'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Star,
  Award,
  TrendingUp,
  Users,
  FileText,
} from 'lucide-react'
import CustomLink from '@/components/Link'
import { cn } from '@/lib/utils'
import { FadeInView, StaggerGrid, StaggerItem } from '@/components/animations'

const statItems = [
  { number: '10+', label: 'Years Experience', icon: TrendingUp },
  { number: '50+', label: 'Publications', icon: FileText },
  { number: '500+', label: 'Students', icon: Users },
  { number: '8', label: 'Courses', icon: BookOpen },
]

const teachingFocus = [
  {
    title: 'Data Science',
    description:
      'Mengajarkan foundations data science, dari eksplorasi data hingga pemodelan prediktif dengan pendekatan hands-on.',
    icon: TrendingUp,
  },
  {
    title: 'Artificial Intelligence',
    description:
      'Materi AI mencakup supervised/unsupervised learning, neural networks, dan aplikasi AI di dunia nyata.',
    icon: GraduationCap,
  },
  {
    title: 'Academic Mentoring',
    description:
      'Membimbing mahasiswa dalam penelitian, penulisan ilmiah, dan pengembangan karier di bidang data dan teknologi.',
    icon: Users,
  },
  {
    title: 'Research Methodology',
    description:
      'Metodologi penelitian kuantitatif dan kualitatif untuk riset di bidang sains data dan komputasi.',
    icon: FileText,
  },
]

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

export default function Main() {
  return (
    <main className="flex-1">
      {/* ─────────────── HERO ─────────────── */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24">
        {/* Background blur circles */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-navy-400/10 blur-[120px]" />
          <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-gold-400/10 blur-[140px]" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-[100px]" />

          {/* Grid pattern */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.03] dark:opacity-[0.05]">
            <defs>
              <pattern
                id="hero-grid"
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 48 0 L 0 0 0 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-navy-500"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid items-center gap-12 lg:grid-cols-5"
          >
            {/* ── LEFT: Text content (3/5) ── */}
            <motion.div variants={childVariants} className="lg:col-span-3">
              {/* Badge */}
              <span className="badge-navy mb-4 inline-block font-display text-xs tracking-wider uppercase">
                Kaprodi Sains Data &bull; Dosen &bull; Researcher
              </span>

              {/* Headline */}
              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Dora{' '}
                <span className="bg-gradient-to-r from-navy via-gold-400 to-navy bg-clip-text text-transparent">
                  Bernandismen
                </span>
              </h1>

              {/* Role */}
              <p className="mt-3 text-lg text-text-secondary dark:text-dark-text-secondary sm:text-xl">
                Kaprodi &amp; Dosen | Academic Leader, Educator, Researcher
              </p>

              {/* Intro */}
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
                Membangun masa depan akademik di bidang Sains Data dan Kecerdasan Buatan
                melalui pendidikan, penelitian, dan bimbingan yang berdampak. Berkomitmen
                menjembatani teori dan praktik untuk menghasilkan lulusan yang kompetitif.
              </p>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <CustomLink href="/about" className="btn-primary gap-2 text-sm">
                  About Me
                  <ArrowRight className="h-4 w-4" />
                </CustomLink>
                <CustomLink href="/materi" className="btn-secondary gap-2 text-sm">
                  <BookOpen className="h-4 w-4" />
                  Materi Kuliah
                </CustomLink>
                <CustomLink href="/contact" className="btn-ghost gap-2 text-sm">
                  <MessageSquare className="h-4 w-4" />
                  Contact
                </CustomLink>
              </div>

              {/* ── STATS (inside hero) ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:flex lg:flex-wrap"
              >
                {statItems.map((stat) => (
                  <div
                    key={stat.label}
                    className="card-base flex items-center gap-3 px-4 py-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 dark:bg-navy-900/40">
                      <stat.icon className="h-4 w-4 text-navy-600 dark:text-navy-300" />
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
                ))}
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Avatar + badges (2/5) ── */}
            <motion.div variants={childVariants} className="lg:col-span-2">
              <div className="relative mx-auto flex w-fit flex-col items-center justify-center">
                {/* Glow ring behind avatar */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-navy-300 via-gold-300 to-navy-500 opacity-25 blur-md"
                  style={{ padding: '6px' }}
                />

                {/* Avatar placeholder */}
                <div className="relative flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-100 to-navy-200 dark:from-navy-800 dark:to-navy-900 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
                  <span className="font-display text-6xl font-bold text-navy-400 dark:text-navy-300 sm:text-7xl lg:text-8xl">
                    DB
                  </span>
                </div>

                {/* Floating badge - Bottom Right (Sinta 2) */}
                <motion.div
                  initial={{ opacity: 0, x: 16, y: 16 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
                  className="card-elevated absolute -bottom-3 -right-3 flex items-center gap-2 rounded-xl px-4 py-2.5 sm:-bottom-4 sm:-right-4"
                >
                  <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                  <span className="whitespace-nowrap text-xs font-semibold text-text-primary dark:text-dark-text-primary">
                    Sinta 2
                  </span>
                </motion.div>

                {/* Floating badge - Top Left (Scopus ID) */}
                <motion.div
                  initial={{ opacity: 0, x: -16, y: -16 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5, ease: 'easeOut' }}
                  className="card-elevated absolute -left-3 -top-3 flex items-center gap-2 rounded-xl px-4 py-2.5 sm:-left-4 sm:-top-4"
                >
                  <GraduationCap className="h-4 w-4 text-navy-500 dark:text-navy-300" />
                  <span className="whitespace-nowrap text-xs font-semibold text-text-primary dark:text-dark-text-primary">
                    Scopus ID
                  </span>
                </motion.div>

                {/* Floating badge - Bottom Left (Scopus) */}
                <motion.div
                  initial={{ opacity: 0, x: -16, y: 16 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
                  className="card-elevated absolute -bottom-10 -left-3 flex items-center gap-2 rounded-xl px-4 py-2.5 sm:-bottom-12 sm:-left-4"
                >
                  <Award className="h-4 w-4 text-emerald-500" />
                  <span className="whitespace-nowrap text-xs font-semibold text-text-primary dark:text-dark-text-primary">
                    Scopus
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── LATEST ARTICLES ─────────────── */}
      <section className="bg-[#f8fafc] py-16 dark:bg-dark-surface-secondary">
        <div className="container">
          <FadeInView>
            <div className="section-title">
              <h2>Latest Articles</h2>
              <p>Tulisan terbaru seputar sains data, pendidikan, dan riset</p>
            </div>
          </FadeInView>

          <StaggerGrid className="mt-10 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <StaggerItem key={i}>
                <div className="card-hover flex flex-col">
                  <div className="flex aspect-video items-center justify-center rounded-xl bg-gradient-to-br from-navy-50 to-navy-100 dark:from-navy-900/30 dark:to-navy-800/30">
                    <FileText className="h-10 w-10 text-navy-300 dark:text-navy-600" />
                  </div>
                  <div className="mt-4 flex-1">
                    <span className="badge-gray">Coming Soon</span>
                    <h3 className="mt-2 font-display text-base font-semibold text-text-primary dark:text-dark-text-primary">
                      Artikel akan segera hadir
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">
                      Konten artikel dan publikasi ilmiah sedang dalam proses penyusunan.
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <FadeInView delay={0.2}>
            <div className="mt-8 text-center">
              <CustomLink
                href="/blog"
                className="btn-secondary inline-flex items-center gap-2 text-sm"
              >
                Lihat Semua Artikel
                <ArrowRight className="h-4 w-4" />
              </CustomLink>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ─────────────── TEACHING FOCUS ─────────────── */}
      <section className="py-16">
        <div className="container">
          <FadeInView>
            <div className="section-title">
              <h2>Teaching Focus</h2>
              <p>Bidang pengajaran dan bimbingan utama</p>
            </div>
          </FadeInView>

          <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teachingFocus.map((item) => (
              <StaggerItem key={item.title}>
                <div className="card-hover group h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-600 transition-colors duration-200 group-hover:bg-navy text-navy-600 dark:bg-navy-900/40 dark:text-navy-300 dark:group-hover:bg-navy-800/60">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-text-primary dark:text-dark-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ─────────────── QUOTE ─────────────── */}
      <section className="bg-gradient-to-r from-navy-50 via-gold-50/30 to-navy-50 py-20 dark:from-navy-900/20 dark:via-gold-900/10 dark:to-navy-900/20">
        <div className="container">
          <FadeInView>
            <figure className="mx-auto max-w-3xl text-center">
              <svg
                className="mx-auto h-8 w-8 text-navy-300 dark:text-navy-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>
              <blockquote className="mt-4 font-display text-xl font-medium leading-relaxed text-text-primary dark:text-dark-text-primary sm:text-2xl">
                &ldquo;Pendidikan bukan sekadar transfer ilmu, tetapi membentuk karakter,
                membuka wawasan, dan menanamkan keberanian untuk terus bertanya.&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-text-secondary dark:text-dark-text-secondary">
                &mdash; Dora Bernandismen
              </figcaption>
            </figure>
          </FadeInView>
        </div>
      </section>

      {/* ─────────────── COLLABORATION CTA ─────────────── */}
      <section className="bg-navy py-20 dark:bg-navy-900">
        <div className="container">
          <FadeInView>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Tertarik untuk Berkolaborasi?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-navy-200 sm:text-base">
                Saya terbuka untuk kolaborasi riset, pengajaran bersama, atau diskusi
                akademik di bidang Sains Data dan Kecerdasan Buatan.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <CustomLink
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 font-medium text-navy-900 transition-all duration-200 hover:bg-gold-500"
                >
                  Hubungi Saya
                  <MessageSquare className="h-4 w-4" />
                </CustomLink>
                <CustomLink
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-navy-400 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-navy-800"
                >
                  Lihat Proyek
                  <ArrowRight className="h-4 w-4" />
                </CustomLink>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>
    </main>
  )
}
