---
title: 'DishNow'
pubDate: '2025-10-02'
github: 'https://github.com/DnzzL/DishNow'
heroImage: '/thumbnails/article.webp'
categories: ['Food', 'Social']
tags: ['Vue', 'Nuxt', 'TypeScript', 'PocketBase', 'Tailwind']
authors: ['Thomas Legrand']
---

It was my first Vue/Nuxt project ever that I made to learn for my recently joined company at the time for my first time as official web dev. The naive idea was to build the "Strava for food", meaning bringing social interactions to recipe saving and sharing.

## 🚀 Key Features

- **🔐 Secure Authentication**: User registration, login, and profile management with PocketBase
- **📝 Recipe Management**: Create, edit, delete, and share detailed recipes with step-by-step instructions
- **🍽️ Dish Discovery**: Browse and explore dishes with rich media support
- **⭐ Rating System**: Comprehensive rating and review functionality for recipes and dishes
- **❤️ Social Interactions**: Like, comment, and engage with community content
- **🔍 Advanced Search**: Powerful search capabilities across recipes, dishes, and users
- **📱 Responsive Design**: Mobile-first approach with adaptive layouts
- **🌐 Recipe Import**: Automated scraping from popular culinary sites (750g, Marmiton, Journal des Femmes, etc.)
- **⚡ Real-Time Updates**: Live notifications and dynamic content updates
- **🎨 Modern UI**: Sleek interface built with Nuxt UI and DaisyUI components

## 🏗️ Architecture Highlights

### Frontend

- **Nuxt 3**: Leverages server-side rendering, static generation, and API routes for optimal performance
- **Vue 3 Composition API**: Modern reactive programming with TypeScript for type safety
- **Nuxt UI + DaisyUI**: Consistent, accessible component library with Tailwind CSS
- **XState Machines**: Finite state machines for complex recipe creation workflows

### Backend

- **PocketBase**: Open-source backend-as-a-service providing real-time database, authentication, and file storage
- **Custom API Routes**: Server-side endpoints for recipe scraping and data processing

### Development & Deployment

- **TypeScript**: End-to-end type safety across the application
- **Bun**: High-performance JavaScript runtime for development and building
- **Docker**: Containerized deployment for consistent environments
