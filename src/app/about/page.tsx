'use client'

import { motion } from 'framer-motion'
import {
  Award,
  BookOpen,
  Briefcase,
  Download,
  GraduationCap,
  Star,
  Users,
  TrendingUp,
  FileText,
  BookMarked,
  Code,
  Lightbulb,
  BarChart3,
  Network,
  ExternalLink,
} from 'lucide-react'
import CustomLink from '@/components/Link'
import { cn } from '@/lib/utils'
import { FadeInView, StaggerGrid, StaggerItem } from '@/components/animations'
import { Button } from '@/components/ui/button'
import type { Profile } from '@/types/data'
import profileData from '@/data/profile.json'

const profile = profileData as Profile

// ──── DATA ────

const timelineData = [
  {
    year: '2024',
    title: 'Ketua Program Studi Sains Data',
    description:
      'Memimpin pengembangan kurikulum berbasis OBE (Outcome-Based Education), menginisiasi kerja sama riset dengan industri, dan mendorong akreditasi program studi.',
    icon: Briefcase,
  },
  {
    year: '2022',
    title: 'Dosen Tetap Sains Data',
    description:
      'Bergabung sebagai dosen tetap di Program Studi Sains Data. Mengampu mata kuliah inti seperti Machine Learning, Data Mining, dan Statistika Komputasi.',
    icon: BookOpen,
  },
  {
    year: '2020',
    title: 'Doktor Ilmu Komputer',
    description:
      'Menyelesaikan program doktor di Universitas Indonesia dengan disertasi tentang penerapan ensemble learning untuk prediksi multivariate time series.',
    icon: GraduationCap,
  },
  {
    year: '2017',
    title: 'Dosen Informatika',
    description:
      'Memulai karier sebagai dosen tetap di Program Studi Informatika. Aktif dalam penelitian dan publikasi ilmiah di bidang Kecerdasan Buatan.',
    icon: Users,
  },
  {
    year: '2015',
    title: 'Magister Ilmu Komputer',
    description:
      'Lulus program magister dari Institut Teknologi Bandung dengan fokus pada Kecerdasan Buatan. Tesis mengenai optimasi algoritma machine learning untuk data tidak seimbang.',
    icon: Award,
  },
]

const educationData = [
  {
    degree: 'Doktor (S3) Ilmu Komputer',
    institution: 'Universitas Indonesia',
    year: '2020',
    icon: GraduationCap,
  },
  {
    degree: 'Magister (S2) Ilmu Komputer',
    institution: 'Institut Teknologi Bandung',
    year: '2015',
    icon: BookMarked,
  },
  {
    degree: 'Sarjana (S1) Matematika',
    institution: 'Universitas Gadjah Mada',
    year: '2012',
    icon: BarChart3,
  },
]

const skillData = [
  { name: 'Data Science', percentage: 95 },
  { name: 'Artificial Intelligence', percentage: 90 },
  { name: 'Machine Learning', percentage: 88 },
  { name: 'Research Methodology', percentage: 92 },
  { name: 'Academic Writing', percentage: 87 },
  { name: 'Data Visualization', percentage: 83 },
  { name: 'Python / R', percentage: 85 },
  { name: 'Deep Learning', percentage: 80 },
]

const certificationData = [
  {
    title: 'Certified Data Scientist',
    issuer: 'BNSP (Badan Nasional Sertifikasi Profesi)',
    icon: Award,
  },
  {
    title: 'Google Data Analytics Professional',
    issuer: 'Google',
    icon: FileText,
  },
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    icon: Code,
  },
  {
    title: 'Microsoft Azure AI Fundamentals',
    issuer: 'Microsoft',
    icon: Lightbulb,
  },
]

const achievementData = [
  {
    title: 'IEEE',
    desc: 'Institute of Electrical and Electronics Engineers — Anggota Aktif',
    icon: Network,
  },
  {
    title: 'ADGAI Indonesia',
    desc: 'Asosiasi Dosen dan Guru AI Indonesia — Anggota',
    icon: Users,
  },
  {
    title: 'ISODA',
    desc: 'Indonesian Society of Data Science — Anggota',
    icon: TrendingUp,
  },
  {
    title: 'Reviewer Jurnal Internasional',
    desc: 'Berkontribusi sebagai reviewer pada jurnal bereputasi internasional',
    icon: FileText,
  },
]

// ──── COMPONENTS ────

function TimelineItem({
  year,
  title,
  description,
  icon: Icon,
  index,
}: {
  year: string
  title: string
  description: string
  icon: React.ElementType
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative flex gap-5 pb-10 last:pb-0"
    >
      <div className="flex flex-col items-center">
        <span className="font-display text-xs font-bold text-navy dark:text-navy-300 whitespace-nowrap">
          {year}
        </span>
        <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-navy bg-surface text-navy transition-colors duration-200 dark:border-navy-400 dark:bg-dark-surface dark:text-navy-300">
          <Icon className="h-3.5 w-3.5" />
        </div>
        <div className="mt-1 w-px flex-1 bg-border dark:bg-dark-border" />
      </div>
      <div className="flex-1 pb-4">
        <h3 className="font-display text-sm font-semibold text-text-primary dark:text-dark-text-primary">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

function SkillBar({
  name,
  percentage,
  index,
}: {
  name: string
  percentage: number
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-medium text-text-primary dark:text-dark-text-primary">
          {name}
        </span>
        <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
          {percentage}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-navy-100 dark:bg-navy-900/50">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-navy to-gold"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.06, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

export default function AboutPage() {
  const firstTwoStats = profile.stats.slice(0, 3)

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-navy-50/50 via-surface to-surface pb-12 pt-24 dark:border-dark-border dark:from-navy-900/20 dark:via-dark-surface dark:to-dark-surface">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-gold-400/10 blur-[100px]" />
          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-navy-400/10 blur-[100px]" />
        </div>

        <div className="container">
          <FadeInView>
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-navy-300 via-gold-300 to-navy-500 opacity-20 blur-md"
                  style={{ padding: '5px' }}
                />
                <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-100 to-navy-200 sm:h-32 sm:w-32 dark:from-navy-800 dark:to-navy-900">
                  <span className="font-display text-3xl font-bold text-navy-400 dark:text-navy-300 sm:text-4xl">
                    {profile.initials}
                  </span>
                </div>
              </div>

              <h1 className="font-display text-3xl font-bold sm:text-4xl">
                About{' '}
                <span className="bg-gradient-to-r from-navy via-gold-400 to-navy bg-clip-text text-transparent">
                  Me
                </span>
              </h1>
              <p className="mt-2 max-w-lg text-sm text-text-secondary dark:text-dark-text-secondary sm:text-base">
                {profile.about.intro}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {profile.badge.items.map((item) => (
                  <span
                    key={item.label}
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium',
                      item.icon === 'star'
                        ? 'bg-gold-50 text-gold-700 dark:bg-gold-900/40 dark:text-gold-200'
                        : 'bg-navy-50 text-navy-700 dark:bg-navy-900/40 dark:text-navy-200'
                    )}
                  >
                    {item.label}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {firstTwoStats.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 dark:border-dark-border dark:bg-dark-surface"
                  >
                    <span className="font-display text-base font-bold text-navy dark:text-navy-300">
                      {s.number}
                    </span>
                    <span className="text-xs text-text-secondary dark:text-dark-text-secondary">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <FadeInView>
              <h2 className="font-display text-xl font-bold text-text-primary dark:text-dark-text-primary">
                Biografi
              </h2>
            </FadeInView>

            <FadeInView delay={0.1}>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                {profile.about.description}
              </p>
            </FadeInView>

            <FadeInView delay={0.2}>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                {profile.about.description2}
              </p>
            </FadeInView>

            <FadeInView delay={0.3}>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
                {profile.about.description3}
              </p>
            </FadeInView>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-16 dark:bg-dark-surface-secondary">
        <div className="container">
          <FadeInView>
            <div className="section-title">
              <h2>Career Timeline</h2>
              <p>Perjalanan karier dan akademik</p>
            </div>
          </FadeInView>

          <div className="mx-auto mt-10 max-w-2xl">
            {timelineData.map((item, i) => (
              <TimelineItem key={item.year} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <FadeInView>
            <div className="section-title">
              <h2>Education</h2>
              <p>Riwayat pendidikan formal</p>
            </div>
          </FadeInView>

          <StaggerGrid className="mt-10 grid gap-6 md:grid-cols-3">
            {educationData.map((edu) => (
              <StaggerItem key={edu.degree}>
                <div className="card-hover h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-600 dark:bg-navy-900/40 dark:text-navy-300">
                    <edu.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-sm font-semibold text-text-primary dark:text-dark-text-primary">
                    {edu.degree}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-navy dark:text-navy-300">
                    {edu.institution}
                  </p>
                  <p className="mt-0.5 text-xs text-text-secondary dark:text-dark-text-secondary">
                    {edu.year}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-16 dark:bg-dark-surface-secondary">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <FadeInView>
              <div className="section-title">
                <h2>Keahlian</h2>
                <p>Bidang kompetensi dan tingkat penguasaan</p>
              </div>
            </FadeInView>

            <div className="mt-10 space-y-4">
              {skillData.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <FadeInView>
            <div className="section-title">
              <h2>Sertifikasi</h2>
              <p>Sertifikasi profesional yang dimiliki</p>
            </div>
          </FadeInView>

          <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2">
            {certificationData.map((cert) => (
              <StaggerItem key={cert.title}>
                <div className="card-hover flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-600 dark:bg-gold-900/30 dark:text-gold-300">
                    <cert.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-text-primary dark:text-dark-text-primary">
                      {cert.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-text-secondary dark:text-dark-text-secondary">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-[#f8fafc] py-16 dark:bg-dark-surface-secondary">
        <div className="container">
          <FadeInView>
            <div className="section-title">
              <h2>Organisasi &amp; Kontribusi</h2>
              <p>Keanggotaan profesional dan kontribusi akademik</p>
            </div>
          </FadeInView>

          <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2">
            {achievementData.map((ach) => (
              <StaggerItem key={ach.title}>
                <div className="card-hover flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <ach.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-text-primary dark:text-dark-text-primary">
                      {ach.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-text-secondary dark:text-dark-text-secondary">
                      {ach.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <FadeInView>
            <div className="mx-auto max-w-xl rounded-2xl border border-border bg-gradient-to-br from-navy-50/50 via-surface to-navy-50/30 p-8 text-center dark:border-dark-border dark:from-navy-900/20 dark:via-dark-surface dark:to-navy-900/10">
              <Award className="mx-auto h-10 w-10 text-navy dark:text-navy-300" />
              <h2 className="mt-4 font-display text-xl font-bold text-text-primary dark:text-dark-text-primary">
                Tertarik untuk bekerja sama?
              </h2>
              <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                Unduh CV lengkap untuk informasi lebih detail tentang pengalaman,
                publikasi, dan kualifikasi akademik.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <CustomLink href="/cv.pdf">
                    <Download className="h-4 w-4" />
                    Download CV
                  </CustomLink>
                </Button>
                <Button variant="secondary" asChild>
                  <CustomLink href="/contact">
                    Hubungi Saya
                    <ExternalLink className="h-4 w-4" />
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
