import type { Metadata } from 'next'
import '@/styles/globals.css'
import ThemeProviders from './theme-providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ReadingProgress from '@/components/ReadingProgress'

export const metadata: Metadata = {
  title: 'Dora Bernandismen',
  description: 'Kaprodi Sains Data | Academic Leader, Educator, Researcher',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProviders>
          <ReadingProgress />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  )
}
