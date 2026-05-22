export interface NavLink {
  title: string
  href: string
}

export interface NavGroup {
  title: string
  children: { title: string; href: string }[]
}

export type NavItem = NavLink | NavGroup

export interface Socials {
  email: string
  linkedin: string
  github: string
  youtube: string
  instagram: string
  googleScholar: string
  sinta: string
}

export interface StatItem {
  number: string
  label: string
  value: string
}

export interface ButtonLink {
  label: string
  href: string
}

export interface BadgeItem {
  label: string
  icon: 'star' | 'graduation-cap' | 'award'
}

export interface FloatingBadge {
  label: string
  icon: string
  position: 'bottom-right' | 'top-left' | 'bottom-left'
  color: string
}

export interface Expertise {
  title: string
  description: string
  gradient: string
}

export interface Hero {
  greeting: string
  headline: string
  description: string
  role: string
  primaryButton: ButtonLink
  secondaryButton: ButtonLink
  tertiaryButton: ButtonLink
}

export interface About {
  intro: string
  description: string
  description2: string
  description3: string
  quote: string
}

export interface CTA {
  title: string
  description: string
  primaryButton: ButtonLink
  secondaryButton: ButtonLink
}

export interface SEO {
  title: string
  titleTemplate: string
  description: string
  keywords: string[]
  ogTitle: string
  ogDescription: string
  ogLocale: string
  ogType: string
}

export interface FooterData {
  copyright: string
}

export interface Profile {
  name: string
  nickname: string
  initials: string
  degree: string
  profession: string
  institution: string
  fullTitle: string
  currentCareer: string
  journalRole: string
  badge: {
    label: string
    items: BadgeItem[]
  }
  hero: Hero
  about: About
  expertise: Expertise[]
  stats: StatItem[]
  floatingBadges: FloatingBadge[]
  cta: CTA
  seo: SEO
  footer: FooterData
}
