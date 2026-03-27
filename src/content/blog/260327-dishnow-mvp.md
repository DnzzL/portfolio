---
title: 'DishNow: From Idea to MVP'
description: 'Building a recipe management PWA that solves real everyday cooking problems'
pubDate: '2026-03-27'
categories: ['Side Project']
heroImage: '/thumbnails/dishnow.png'
tags: ['PWA', 'Nuxt', 'Side Project', 'Vue']
---

Cooking is a daily routine that should be enjoyable, not a logistical puzzle. Yet I found myself constantly juggling between recipe websites, scattered notes, and shopping lists that never quite matched what I actually needed. That's the gap **DishNow** aims to fill.

# The Problem I Wanted to Solve

I cook almost every day, and over time I've collected recipes from various sources—family favorites, blog posts, Instagram reels, cookbooks. The problem? They were everywhere. A link saved here, a screenshot there, a handwritten note somewhere else.

On top of that, recipe websites have become increasingly bloated with ads and popups. Getting to the actual recipe means scrolling past life stories, autoplaying videos, and cookie banners. I wanted to save the recipe, not wade through content marketing.

When it came time to plan meals and shop for ingredients, I'd spend more time hunting down recipes than actually cooking. I wanted something simple: **one place for all my recipes**, and tools that make the weekly routine actually practical.

# Building the MVP

I decided to build DishNow as a **Progressive Web App**. The PWA approach made sense—it works on any device, can be installed on a phone like a native app, and doesn't require app store approval for updates. Plus, with the Vue ecosystem I've grown to love, I could move fast.

The core features for the MVP were clear:

1. **Recipe Saving** — A central place to store recipes, with easy import from URLs
2. **Weekly Meal Planning** — Simple drag-and-drop to plan the week
3. **Shopping Lists** — Auto-generated from selected recipes, organized for efficient grocery trips
4. **Sharing** — Public links for recipes and shopping lists (useful when someone else is doing the shopping)

# The Tech Stack

I went with what I know works well:

- **Nuxt 4** for the frontend framework
- **PocketBase** for the backend (self-hosted, real-time, simple)
- **TanStack Query** for data fetching
- **Nuxt UI** for components
- **Mistral AI** for recipe extraction from URLs and OCR (free tier for now—might hit limits eventually, but it works)

This stack lets me focus on features rather than infrastructure. PocketBase handles auth and database without the complexity of a full backend setup, and Mistral's API makes recipe parsing surprisingly painless.

# What I Learned Building for Myself

Building a product you actually use changes your perspective. Features I thought were essential became nice-to-haves, while small quality-of-life improvements became critical.

For example, the **shopping list organization**—originally I planned complex categorization. What I actually needed was simpler: group items by store section, and make it easy to check things off. That's it.

The **recipe import from URLs** feature taught me a lot about handling inconsistent data. Every recipe website has a different structure. I ended up using AI to extract structured recipe data from web pages, which works surprisingly well.

# Where It Stands Now

The MVP is functional and I use it daily. It handles my recipe collection, weekly planning, and shopping needs without friction. The sharing feature has been useful—my partner can see the shopping list and add items, which makes coordination easier.

There's still plenty to improve. Better meal planning suggestions, more robust recipe parsing, maybe even a mobile app. But the core value is there: **a practical tool that fits into the cooking routine without demanding attention**.

# Why This Matters

Side projects often become portfolio pieces or learning exercises. DishNow is both, but more importantly, it's a tool that solves a problem I genuinely have. That makes the difference between a project I maintain and one I abandon.

The MVP stage taught me that **solving your own problem well** beats building something impressive that nobody uses. The features that matter aren't the flashy ones—they're the ones that remove friction from daily life.

If you're curious, you can try it at [dishnow.legrand.sh](https://dishnow.legrand.sh). It's still evolving, but it's already made my cooking routine more organized and less stressful. And isn't that the point of building tools in the first place?
