---
title: 'DishNow v2'
pubDate: '2025-10-02'
github: 'https://github.com/DnzzL/DishNow'
heroImage: '/project-images/dishnow/dishnow.gif'
categories: ['Food', 'AI']
tags: ['Vue', 'Nuxt', 'TypeScript', 'PocketBase', 'Tailwind', 'AI', 'Mistral']
authors: ['Thomas Legrand']
---

An AI-powered recipe management and meal planning application that generates recipes, plans meals, and creates shopping lists automatically. Built with Nuxt 4, TypeScript, and Mistral AI integration.

## 🚀 Key Features

- **🤖 AI Recipe Creation**: Conversational AI interface for generating custom recipes using Mistral AI
- **🖼️ AI Recipe Extraction**: Automatically extract recipes from URLs and images using AI vision
- **📝 Recipe Management**: Create, edit, and organize recipes with detailed ingredients and instructions
- **🛒 AI Shopping Lists**: Generate shopping lists from recipes with intelligent ingredient aggregation
- **📅 AI Meal Planning**: Plan meals with AI-powered suggestions and automatic shopping list generation
- **🔍 AI-Powered Search**: Find recipes using AI-powered filters and smart matching
- **📚 Recipe Collections**: Organize recipes into custom collections
- **🔐 User Authentication**: Secure user management with PocketBase
- **💚 Supporter System**: Pay-what-you-want contributions to support development
- **📱 Mobile Apps**: iOS and Android apps via Capacitor

## 🏗️ Architecture Highlights

### Frontend

- **Nuxt 4**: Modern Vue framework with SSR/SPA capabilities
- **Vue 3 Composition API**: Modern reactive programming with TypeScript
- **Nuxt UI**: Beautiful, accessible UI components with Tailwind CSS
- **TanStack Vue Query**: Advanced data fetching and caching
- **Pinia**: Client state management
- **Zod Schemas**: Type-safe data validation and inference

### Backend

- **PocketBase**: Self-hosted backend with real-time database, authentication, and file storage
- **SQLite**: Database engine via PocketBase
- **Real-time Subscriptions**: Live data updates

### AI Integration

- **Vercel AI SDK**: AI model integration
- **Mistral AI**: Large language model for recipe generation
- **Google AI**: Additional AI model support

### Development & Deployment

- **TypeScript**: Full type safety across the entire stack
- **Turborepo**: Optimized monorepo build system
- **Bun**: High-performance package manager and runtime
- **Capacitor**: Cross-platform mobile apps (iOS/Android)
- **Docker**: Containerized deployment
