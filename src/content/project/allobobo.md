---
title: 'allobobo'
pubDate: '2025-10-02'
heroImage: '/thumbnails/article.webp'
categories: ['AI', 'Health']
tags: ['TypeScript', 'React', 'Vite', 'Bun', 'Hono', 'Turbo', 'Qdrant', 'Vercel AI', 'Mistral AI']
authors: ['Thomas Legrand']
---

A Retrieval-Augmented Generation (RAG) chatbot for French health data from Haute Autorité de Santé (HAS). Provides intelligent responses based on processed health data using embeddings and semantic search.

![allobobo](/project-images/allobobo/allobobo.gif)

## 🚀 Key Features

- **🤖 RAG Chatbot**: Context-aware AI responses using Mistral LLM
- **🏥 French Health Data**: Integrates HAS open data for reliable medical info
- **🔄 Advanced Processing**: Automated ingestion, chunking, and embedding of XML docs
- **🗄️ Vector Database**: Self-hosted Qdrant for semantic search
- **🔒 Type-Safe Architecture**: End-to-end TypeScript reliability

## 🏗️ Architecture Highlights

### Frontend

- **React**: Interactive chat interface with real-time streaming
- **Vite**: Fast development and bundling
- **TypeScript**: Type-safe components

### Backend

- **Hono**: Lightweight API for chat and vector queries
- **Qdrant**: High-performance semantic search
- **Vercel AI SDK**: Integration with Mistral LLM

### Development & Deployment

- **Bun**: High-performance runtime and package manager
- **Turbo**: Monorepo orchestration for builds
- **Docker**: Containerized environments
