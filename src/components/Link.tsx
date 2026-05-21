import NextLink from 'next/link'
import type { LinkProps as NextLinkProps } from 'next/link'
import type { AnchorHTMLAttributes } from 'react'

type CustomLinkProps = NextLinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    external?: boolean
  }

const CustomLink = ({ href, external, children, className = '', ...rest }: CustomLinkProps) => {
  if (!href) {
    return <a className={className} {...rest}>{children}</a>
  }

  const isInternal = href.startsWith('/') && !external
  const isAnchor = href.startsWith('#')

  if (isInternal) {
    return (
      <NextLink href={href} className={className} {...rest}>
        {children}
      </NextLink>
    )
  }

  if (isAnchor) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...rest}
    >
      {children}
    </a>
  )
}

export default CustomLink
