import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text-primary dark:text-dark-text-primary">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={cn(
            'w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary transition-all duration-200 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text-primary dark:placeholder-dark-text-tertiary dark:focus:border-navy-500 dark:focus:ring-navy-500/20',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
