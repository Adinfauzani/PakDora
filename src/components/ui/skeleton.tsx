import { cn } from '@/lib/utils'

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-shimmer rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-dark-surface-tertiary dark:via-dark-surface-secondary dark:to-dark-surface-tertiary bg-[length:200%_100%]',
        className
      )}
      {...props}
    />
  )
}
