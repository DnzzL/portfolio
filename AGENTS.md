# AGENTS.md - Industrial Elegance Design System

This document provides guidance for AI agents working on this portfolio site.

## Overview

This is a personal portfolio site for Thomas Legrand, a software engineer based in Nice, France. The site uses a custom design system called "Industrial Elegance" that emphasizes technical precision, monospace typography, and dark mode aesthetics.

## Critical Design Rules

### Color System (STRICT)

Always use these exact color values:

```css
/* Backgrounds */
--bg-primary: #1a1a2e /* Deep charcoal - main background */ --bg-secondary: #252540
  /* Slightly lighter - cards, sections */ --bg-tertiary: #2d2d4a /* Lighter still - hover states */ /* Text */
  --text-primary: #f7f7f5 /* Off-white - main text */ --text-secondary: #718096 /* Steel gray - secondary text */
  --text-muted: #4a5568 /* Dark steel - meta text */ /* Accent */ --accent-primary: #d69e2e
  /* Amber/gold - links, accents */ --accent-secondary: #ecc94b /* Light amber - hover states */ /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.06) /* Default borders */ --border-accent: rgba(214, 158, 46, 0.3)
  /* Accent borders */;
```

### Typography (STRICT)

- **Font Family**: `JetBrains Mono` ONLY - loaded from Google Fonts
- **Weights**: 400 (normal), 500 (medium), 600 (semibold)
- **Style**: Monospace throughout - no sans-serif exceptions
- **Line Height**: 1.6 for body, 1.2 for headings

### Layout Principles (STRICT)

1. **NO BORDER RADIUS**: Everything has sharp corners (0px radius)
2. **Grid Pattern**: Background uses 60px technical grid (`bg-grid` class)
3. **Noise Texture**: Pages use subtle noise overlay (`noise-texture` class)
4. **Max Width**: Content constrained to `max-w-6xl` (1152px)
5. **Padding**: Use `px-6 sm:px-8 lg:px-12` for consistent gutters

### Component Patterns

#### Cards

```html
<article class="group card-hover border border-[rgba(255,255,255,0.06)] bg-[#252540] p-8">
  <!-- Content -->
</article>
```

- Background: `#252540` (or `#1a1a2e` for contrast sections)
- Border: 1px solid `rgba(255,255,255,0.06)`
- Hover: Border transitions to amber (`#d69e2e`)
- Padding: `p-6` or `p-8`
- NO border-radius

#### Section Headers

```html
<div class="mb-16 border-b border-[rgba(255,255,255,0.06)] pb-6">
  <span class="mb-2 block text-xs tracking-[0.2em] text-[#4a5568] uppercase"> 01 </span>
  <h2 class="text-2xl font-medium text-[#f7f7f5] sm:text-3xl">Section Title</h2>
</div>
```

- Number all major sections (01, 02, 03...)
- Uppercase tracking for numbers: `tracking-[0.2em]`
- Border bottom separator
- Text color: `#f7f7f5` for headings, `#4a5568` for numbers

#### Links & CTAs

```html
<a
  class="group inline-flex items-center gap-3 border border-[rgba(255,255,255,0.1)] px-6 py-3 transition-colors duration-200 hover:border-[#d69e2e]"
>
  <span class="text-sm tracking-[0.15em] text-[#f7f7f5] uppercase"> Action Text </span>
  <span class="text-[#d69e2e]">→</span>
</a>
```

- Border: 1px with subtle white
- Hover: Border changes to amber
- Uppercase with tracking for button text
- Arrow icon in amber

#### Navigation

- Fixed header with backdrop blur
- Site logo uses `$` prefix: `$ Thomas Legrand`
- Links hover to amber
- Mobile menu uses same border styles

## Content Guidelines

### Location

Thomas is based in **Nice, France** - not Paris. Update this everywhere if found.

### Availability

Thomas is **not** looking for work. Do not add "Available for work" badges or indicators.

### Tone

- Professional but approachable
- Technical precision over marketing fluff
- First person when appropriate
- Focus on AI, Vue/Nuxt, TypeScript

## Page Templates

### Homepage (`src/pages/index.astro`)

Sections in order:

1. Hero (terminal-inspired, no availability badge)
2. Projects grid (numbered 01-04)
3. Writing list (numbered articles)
4. About/Contact two-column

### Blog Listing (`src/pages/blog/[...page].astro`)

```
~/blog header
Numbered list of articles with:
- Date (monospace)
- Category (amber, uppercase)
- Title
- Description
- Arrow indicator
```

### Blog Post (`src/layouts/BlogPost.astro`)

```
Breadcrumb: ← Back to articles
Header with:
- Date • Category
- Title (large)
- Description
Hero image (if exists)
Article content
Tags section (if exists)
```

### Projects Listing (`src/pages/projects/[...page].astro`)

Similar to blog but 2-column grid layout, no descriptions shown in list.

### 404 Page

Minimal design:

- Large "404" in muted color
- "Page not found" heading
- Back home link

## Files to Check

When making changes, always verify these files use the correct styles:

- `src/styles/global.css` - Design tokens
- `src/components/Header.astro` - Navigation
- `src/components/Hero.astro` - Homepage hero
- `src/components/Footer.astro` - Footer
- `src/layouts/Base.astro` - Base layout with fonts
- `src/layouts/BlogPost.astro` - Article layout
- `src/layouts/Posts.astro` - Blog listing
- `src/layouts/Projects.astro` - Projects listing
- `src/components/Pagination.astro` - Pagination

## Common Mistakes to Avoid

1. **DO NOT use rounded corners** - Everything should be sharp
2. **DO NOT use non-monospace fonts** - JetBrains Mono only
3. **DO NOT add "Available for work" badges**
4. **DO NOT use Paris** - Use Nice, France
5. **DO NOT use bright white** - Use off-white `#f7f7f5`
6. **DO NOT use purple/blue gradients** - Use amber/gold accents only
7. **DO NOT add decorative elements** - Keep it utilitarian

## Testing Checklist

After making changes, verify:

- [ ] No rounded corners on any element
- [ ] JetBrains Mono font is applied everywhere
- [ ] Colors match the strict palette
- [ ] Dark mode only (no light mode toggle needed)
- [ ] Grid pattern visible in background
- [ ] Hover states work (borders to amber)
- [ ] Responsive on mobile (no horizontal scroll)
- [ ] Location says "Nice, France"
- [ ] No availability badges

## Build Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint:eslint  # Run ESLint
```

## Questions?

Refer to `README.md` for full design system documentation.
