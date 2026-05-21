import { Mail, Github, Linkedin, Youtube, Instagram } from 'lucide-react'
import Link from './Link'
import socialsData from '@/data/socials.json'
import profileData from '@/data/profile.json'

const socials = socialsData as {
  email: string
  github: string
  linkedin: string
  youtube: string
  instagram: string
}
const profile = profileData as { name: string; footer: { copyright: string } }

const iconMap: Record<string, React.ElementType> = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
}

const socialEntries = [
  { key: 'email', label: 'Email' },
  { key: 'github', label: 'GitHub' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'instagram', label: 'Instagram' },
] as const

const Footer = () => {
  return (
    <footer className="border-t border-border dark:border-dark-border">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            {socialEntries.map(({ key, label }) => {
              const href = socials[key as keyof typeof socials]
              if (!href) return null
              const Icon = iconMap[key]
              return (
                <Link
                  key={key}
                  href={href}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-navy-50 hover:text-navy dark:text-dark-text-secondary dark:hover:bg-navy-900/30 dark:hover:text-navy-300"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              )
            })}
          </div>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
            &copy; {new Date().getFullYear()} {profile.name}. {profile.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
