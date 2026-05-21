import * as React from 'react'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'

const variants = {
  primary:
    'bg-navy text-white hover:bg-navy-700 shadow-soft hover:shadow-hover active:scale-[0.98]',
  secondary:
    'border border-border bg-transparent text-text-primary hover:bg-gray-50 dark:border-dark-border dark:text-dark-text-primary dark:hover:bg-dark-surface-tertiary',
  ghost:
    'bg-transparent text-text-primary hover:bg-gray-100 dark:text-dark-text-primary dark:hover:bg-dark-surface-tertiary',
  gold:
    'bg-gold text-navy-900 hover:bg-gold-500 shadow-soft hover:shadow-hover active:scale-[0.98]',
  outline:
    'border-2 border-navy bg-transparent text-navy hover:bg-navy hover:text-white dark:border-navy-300 dark:text-navy-300 dark:hover:bg-navy dark:hover:text-white',
}

const sizes = {
  sm: 'h-9 px-3 text-xs rounded-lg',
  md: 'h-11 px-5 text-sm rounded-xl',
  lg: 'h-13 px-7 text-base rounded-xl',
  icon: 'h-10 w-10 rounded-xl',
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  loading?: boolean
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, asChild = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    if (asChild) {
      return (
        <Comp
          className={cn(
            'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            variants[variant],
            sizes[size],
            className
          )}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'
