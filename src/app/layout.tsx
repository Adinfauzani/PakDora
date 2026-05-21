import type { Metadata } from 'next'
import '@/styles/globals.css'
import type { Profile } from '@/types/data'
import profileData from '@/data/profile.json'
import ThemeProviders from './theme-providers'
import TRPCProvider from './trpc-provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'

const profile = profileData as Profile

export const metadata: Metadata = {
  title: {
    default: profile.seo.title,
    template: profile.seo.titleTemplate,
  },
  description: profile.seo.description,
  keywords: profile.seo.keywords,
  authors: [{ name: profile.name }],
  openGraph: {
    title: profile.seo.ogTitle,
    description: profile.seo.ogDescription,
    locale: profile.seo.ogLocale,
    type: profile.seo.ogType as 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProviders>
          <TRPCProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </TRPCProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}
