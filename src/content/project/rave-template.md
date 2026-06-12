---
title: 'RAVE Template'
pubDate: '2026-03-12'
heroImage: '/thumbnails/rust.png'
categories: ['DevTools', 'Open Source']
tags: ['Rust', 'Axum', 'TypeScript', 'Vite', 'SQLite', 'Full-stack', 'Template']
authors: ['Thomas Legrand']
---

**Rust + Axum + Vite + Everything (else you don't need)**

A monorepo template for building full-stack applications with a type-safe Rust backend and a modern TypeScript frontend. Built as a learning project to explore Rust while keeping the TypeScript developer experience I love.

## 🎯 The Idea

I wanted to learn Rust. Everyone says it's the future, especially for backend development. But most Rust web frameworks felt overwhelming for someone coming from TypeScript.

So I built RAVE—a simple stack that lets me:

- Learn Rust practically by building something real
- Keep my TypeScript frontend (SPA architecture, clear separation of concerns)
- Get type-safe APIs without manual type syncing
- Deploy from a single binary (same-origin, no CORS headaches)

Axum is the simplest way I've found to build APIs with Rust. Pair it with `serde` for serialization and `ts-rs` for TypeScript generation, and the frontend doesn't even know Rust is involved—it just gets typed APIs.

Plus, it makes a good acronym. So let's go for a ride.

## 🚀 Key Features

- **🦀 Type-Safe APIs**: Rust structs → TypeScript types automatically via `ts-rs`
- **⚡ Blazingly Fast Backend**: Axum 0.8 + SQLite with WAL mode
- **🔥 Hot Reloading**: `cargo-watch` included for instant server restarts
- **📦 Zero Config**: `devbox shell` && you're coding
- **🎯 Actually Simple**: No Kubernetes degree required

## 🏗️ Architecture Highlights

### Backend

- **Axum 0.8**: Fastest async web framework in Rust with new route syntax
- **SQLite (sqlx)**: 99% of apps don't need PostgreSQL. WAL mode enables concurrent reads
- **ts-rs 10**: Automatic TypeScript type generation from Rust structs
- **tower-sessions**: Session management (see AUTH.md for complete auth guide)
- **Argon2**: Secure password hashing when you need authentication

### Frontend

- **Vite + React**: Fastest DX with zero config (swap for Vue/Svelte/Solid)
- **TypeScript**: Full type safety from auto-generated bindings
- **Proxy Setup**: Pre-configured for local development with backend

### Development Experience

- **cargo-watch**: Edit `.rs` file → server automatically restarts
- **devbox**: Reproducible dev environments across machines
- **Minimal Config**: No Prettier/ESLint/module system fragmentation

## 💡 Perfect For

- **Learning Rust**: Best way to learn is by building something real
- **Side Projects**: Simple stack that doesn't require a Rust PhD
- **MVPs**: Type-safe APIs without the complexity
- **Same-Origin Deployment**: One binary serves API + static files

## 🤷 What It's Not

- **Production-hardened**: I'm still learning Rust, use at your own risk
- **Enterprise-ready**: No Kubernetes, no microservices, no complexity
- **The "chosen one"**: Rust might be the future, but this is just a template

## 🔧 Tech Stack

| Layer       | Technology    | Why                                               |
| ----------- | ------------- | ------------------------------------------------- |
| Backend     | Axum 0.8      | Fastest async Rust web framework                  |
| Database    | SQLite + sqlx | Compile-time checked queries, no over-engineering |
| Frontend    | Vite + React  | Fast HMR, zero config                             |
| Type Safety | ts-rs         | Rust → TypeScript, automatically                  |
| Dev Env     | devbox        | Reproducible environments                         |
| Hot Reload  | cargo-watch   | Edit → restart, automatically                     |

## 🎪 Example: Todo App

The template includes a complete working todo app:

```rust
// Define your model (backend/src/models.rs)
#[derive(TS, Serialize, Deserialize, sqlx::FromRow)]
#[ts(export, export_to = "../../frontend/src/bindings/")]
pub struct Todo {
    pub id: i64,
    pub title: String,
    pub completed: bool,
}
```

Run `cargo test` to generate TypeScript types:

```typescript
// frontend/src/bindings/models.ts
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
```

Use in your frontend with full type safety:

```typescript
async function getTodos(): Promise<Todo[]> {
  const res = await fetch('/api/todos');
  return res.json(); // ← Fully typed, no `any`
}
```

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/DnzzL/rave-template.git
cd rave-template

# Enter dev environment
devbox shell

# Start backend (with hot reloading)
devbox run dev:examples:todo:backend:watch

# In another terminal: start frontend
devbox run dev:examples:todo:frontend
```

Your app is now running at:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api/todos

## 🎟️ Deployment

```bash
# Build frontend
cd frontend && npm run build

# Build backend
cd backend && cargo build --release

# Deploy anywhere
scp target/release/rave-backend your-server:/app/
scp -r frontend/dist your-server:/app/

# Run
DATABASE_URL=sqlite:./app.db ./rave-backend
```

No Docker required. No Nginx config. Axum serves the `dist/` folder as static files.

## 🔐 Authentication

Need auth? See **[AUTH.md](https://github.com/DnzzL/rave-template/blob/main/AUTH.md)** for a complete guide:

- User registration & login
- Session management with `tower-sessions`
- Password hashing with Argon2
- Protected routes
- Frontend integration

## 📦 What's Inside

```
rave-template/
├── backend/              # Rust backend
│   ├── src/
│   │   ├── main.rs       # Axum server
│   │   ├── models.rs     # Define types → auto TS generation
│   │   ├── db.rs         # SQLite pool (WAL mode)
│   │   └── api/          # Your API routes
│   └── migrations/       # SQL migrations
│
├── frontend/             # TypeScript frontend
│   ├── src/
│   │   ├── App.tsx       # Starter component
│   │   ├── lib/api.ts    # Typed fetch wrapper
│   │   └── bindings/     # Auto-generated TypeScript
│   └── vite.config.ts    # Proxy setup
│
└── examples/
    └── todo-app/         # Complete working example
        ├── backend/      # Full CRUD with hot reloading
        └── frontend/     # React UI
```

## 🎭 Philosophy

**Learn by building. Keep it simple. Add complexity when needed.**

What we left out (on purpose):

- ❌ Kubernetes (you don't need it)
- ❌ Message queues (you don't need it)
- ❌ Microservices (you _definitely_ don't need it)
- ❌ GraphQL (REST for CRUD works fine)
- ❌ Complex config (Prettier, ESLint, etc.)

This is a learning project. I'm exploring Rust while building something useful. If it helps you learn too, great. If not, no worries—there are more mature Rust stacks out there.

## 🔗 Links

- **[GitHub Repository](https://github.com/DnzzL/rave-template)**
- **[Full Documentation](https://github.com/DnzzL/rave-template/blob/main/README.md)**
- **[Authentication Guide](https://github.com/DnzzL/rave-template/blob/main/AUTH.md)**
- **[Devbox Setup](https://github.com/DnzzL/rave-template/blob/main/DEVBOX.md)**

---

**Made with 🦀 Rust (learning in progress), ⚡ Vite, and ☕ Coffee**
