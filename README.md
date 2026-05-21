# Dora Bernandismen — Academic Portfolio

T3 Stack portfolio website for Dora Bernandismen, Kaprodi Sains Data.

## Stack

- **Framework**: Next.js 16 App Router + Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui patterns
- **Animations**: Framer Motion
- **Theme**: next-themes (dark mode default)
- **Content**: contentlayer2 + MDX (ready)
- **PDF**: react-pdf + pdfjs-dist
- **Guestbook**: Giscus (GitHub Discussions)

## Pages (11)

| Route | Type | Content |
|-------|------|---------|
| `/` | Static | Hero + stats + teaching focus + quote + CTA |
| `/about` | Static | Biography + timeline + education + skills + certifications + organizations |
| `/blog` | Static | Blog listing with search + tags (contentlayer ready) |
| `/projects` | Static | 8 project cards with category filters + search |
| `/projects/[slug]` | Dynamic | Project detail |
| `/materi` | Static | 4 course cards with search + semester filter |
| `/materi/[materiaId]` | Dynamic | Split layout: sidebar + PDF viewer + assignments + references |
| `/guestbook` | Static | Giscus-powered guestbook |
| `/contact` | Static | Contact cards + social grid |
| `/uses` | Static | Hardware, software, teaching & productivity tools |

## Getting Started

```bash
cd dora-v2
yarn dev
```

## Build

```bash
yarn build
```
