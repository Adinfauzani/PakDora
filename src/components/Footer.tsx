import { Mail, Github, Linkedin, Youtube, Instagram } from 'lucide-react'
import Link from './Link'

const socials = [
  { icon: Mail, href: 'mailto:dora@example.com', label: 'Email' },
  { icon: Github, href: 'https://github.com/dorabernandismen', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/dorabernandismen', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@dorabernandismen', label: 'YouTube' },
  { icon: Instagram, href: 'https://instagram.com/dorabernandismen', label: 'Instagram' },
]

const Footer = () => {
  return (
    <footer className="border-t border-border dark:border-dark-border">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary transition-colors hover:bg-navy-50 hover:text-navy dark:text-dark-text-secondary dark:hover:bg-navy-900/30 dark:hover:text-navy-300"
                aria-label={s.label}
              >
                <s.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
            &copy; {new Date().getFullYear()} Dora Bernandismen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
