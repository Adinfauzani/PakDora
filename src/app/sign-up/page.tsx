'use client'

import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

export default function SignUpPage() {
  const { resolvedTheme } = useTheme()

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <SignUp
        appearance={{
          baseTheme: resolvedTheme === 'dark' ? dark : undefined,
          elements: {
            card: 'shadow-xl rounded-2xl',
            headerTitle: 'font-display text-2xl',
          },
        }}
      />
    </div>
  )
}
