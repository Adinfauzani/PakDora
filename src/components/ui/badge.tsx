import * as React from 'react'
import { cn } from '@/lib/utils'

const variants = {
  navy: 'bg-navy-50 text-navy-700 dark:bg-navy-900/40 dark:text-navy-200',
  gold: 'bg-gold-50 text-gold-700 dark:bg-gold-900/40 dark:text-gold-200',
  emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200',
  gray: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200',
  red: 'bg-red-50 text-red-700 dark:bg-red-900/40 dark:text-red-200',
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants
}

export function Badge({ className, variant = 'navy', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
