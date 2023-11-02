---
title: 'With Astro came speed'
description: 'Rewrite of my website with Astro.build'
pubDate: '2022-11-28'
categories: ['Astro', 'Blog']
heroImage: '/blog-placeholder.jpg'
tags: ['Portfolio']
author: '["Thomas"]'
---

## Context

I have made a few iterations on my website, not so much for the safe of the content itself but rather to keep on learning.

At first, I was using a Jekyll blog deployed on Github Pages, then I decided to purchase my own domain and used Netlify to deploy.

Then, at the time I was learning to do a bit of React, I decided to do a complete rewrite with React and Tailwind.

Time passed, and when I was on the verge of migrating to NextJS to get better SEO (for the fans), I came across the recent v1.0 release of [Astro](https//www.astro.build)

## About Astro

![Astro 1.0](/blog-images/astro-rewrite/astro_one.webp 'Astro 1.0')
Astro defines itself as a web framework for building fast, content-focused websites. It is designed for speed thanks to what they call **Astro islands**: unused JavaScript is replaced with lightweight HTML, guaranteeing faster loads and time-to-interactive (TTI).

Astro also supports both static output (**SSG**) and live server output (**SSR**) that can render your content on-demand.

However, the real killing features are:

- first class citizen support for Markdown and MDX
- compatibility with common tools like React, Vue, Tailwind ...

## The rewrite

As all my React components were static, the rewrite was mainly a copy paste of tailwind components to `.astro` files.

The real benefit it a way cleaner approch on my Markdown blog posts:

```ts
const posts = (await Astro.glob('../../blog-posts/*.md')).sort(
  (a, b) => new Date(b.frontmatter.date).valueOf() - new Date(a.frontmatter.date).valueOf()
);
```

and also a more optimized handling of images by using the Astro native `<Image>` component

```ts
<Image
    src={socialImage}
    format="webp"
    height={96}
    aspectRatio="1:1"
    alt="my picture"
/>
```

In the end, I managed to reach a **100 Performance score** on Lighthouse, more than enough I guess.
![Lighthouse score](/blog-images/astro-rewrite/lighthouse.png 'Lighthouse score')

## Final notes

Credits to Leosvel for his [amazing tutorial](https://leosvel.dev/blog/creating-my-personal-website-with-astro-tailwindcss-and-nx/) that helped me a lot for the rewrite.
