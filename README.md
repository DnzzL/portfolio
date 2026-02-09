# Thomas Legrand - Personal Portfolio

A personal portfolio and blog built with Astro, featuring the **Industrial Elegance** design system. Built on top of the EV0 Astro Theme.

## Design System: Industrial Elegance

The site follows a distinctive "Industrial Elegance" design philosophy that combines technical precision with European sophistication.

### Philosophy

- **Dark-first**: Default dark mode with deep charcoal backgrounds
- **Monospace typography**: JetBrains Mono for technical, code-like aesthetics
- **Technical precision**: Grid layouts, sharp corners, utilitarian borders
- **Amber accents**: French sophistication through strategic gold/amber highlights
- **Content-first**: No decorative fluff, pure information hierarchy

### Color Palette

| Token                | Value     | Usage                       |
| -------------------- | --------- | --------------------------- |
| `--charcoal`         | `#1a1a2e` | Primary background          |
| `--charcoal-light`   | `#252540` | Secondary backgrounds       |
| `--charcoal-lighter` | `#2d2d4a` | Tertiary surfaces           |
| `--steel`            | `#4a5568` | Muted text, borders         |
| `--steel-light`      | `#718096` | Secondary text              |
| `--amber`            | `#d69e2e` | Primary accent, links hover |
| `--amber-light`      | `#ecc94b` | Secondary accent            |
| `--offwhite`         | `#f7f7f5` | Primary text                |

### Typography

- **Font**: JetBrains Mono (Google Fonts)
- **Weights**: 400, 500, 600
- **Style**: Monospace throughout for technical consistency
- **Hierarchy**: Section numbering (01, 02, 03...), uppercase tracking for labels

### Layout Principles

1. **Grid-based**: 60px grid pattern background
2. **Sharp corners**: No border-radius (utilitarian aesthetic)
3. **Technical borders**: 1px borders with subtle opacity (`rgba(255,255,255,0.06)`)
4. **Numbered sections**: Content organized with technical indexing (01, 02, 03...)
5. **Terminal-inspired**: `$` and `~/` prefixes in hero section

### Components

#### Cards

- Background: `--charcoal-light` or `--bg-secondary`
- Border: 1px solid `rgba(255,255,255,0.06)`
- Hover: Border transitions to amber
- No border-radius

#### Navigation

- Fixed header with backdrop blur
- `$` prefix before site title
- Minimal links with hover color transition to amber

#### Buttons/Links

- Border: 1px with low opacity white
- Hover: Border and text transition to amber
- Uppercase tracking for CTAs

### File Structure

```
src/
├── components/
│   ├── Header.astro          # Fixed nav with monospace branding
│   ├── Hero.astro            # Terminal-inspired hero section
│   ├── Footer.astro          # Technical footer with echo command
│   └── Pagination.astro      # Square pagination buttons
├── layouts/
│   ├── Base.astro            # Dark mode default, JetBrains Mono
│   ├── BlogPost.astro        # Article layout with breadcrumb
│   ├── Posts.astro           # Blog listing layout
│   └── Projects.astro        # Project grid layout
├── pages/
│   ├── index.astro           # Homepage with numbered sections
│   ├── blog/[...page].astro  # Blog listing
│   ├── blog/[...slug].astro  # Blog posts
│   ├── projects/[...page].astro # Projects listing
│   ├── projects/[...slug].astro # Project detail
│   ├── tags/index.astro      # Tags page
│   ├── categories/index.astro # Categories page
│   └── 404.astro             # Error page
└── styles/
    └── global.css            # Industrial Elegance design tokens
```

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Content Management

#### Adding Blog Posts

Create a new markdown file in `src/content/blog/`:

```markdown
---
title: 'Your Post Title'
description: 'Brief description of the post'
pubDate: '2025-01-15'
categories: ['AI', 'Development']
heroImage: '/thumbnails/your-image.webp'
tags: ['tag1', 'tag2']
---

Your content here...
```

#### Adding Projects

Create a new markdown file in `src/content/project/`:

```markdown
---
title: 'Project Name'
pubDate: '2025-01-15'
heroImage: '/thumbnails/project.webp'
categories: ['Webdev']
tags: ['Vue', 'Nuxt', 'TypeScript']
authors: ['Thomas Legrand']
github: 'https://github.com/username/repo'
url: 'https://project-url.com'
---

Description of the project...
```

## Technology Stack

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS 4.x
- **Language**: TypeScript
- **Typography**: JetBrains Mono (Google Fonts)
- **Icons**: Custom SVG components

## License

MIT License - based on the EV0 Astro Theme.

## Credits

- Original theme: [EV0 Astro Theme](https://github.com/gndx/ev0-astro-theme) by Oscar Barajas
- Design system: Industrial Elegance by Thomas Legrand
