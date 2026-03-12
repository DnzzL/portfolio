---
title: 'Introducing RAVE: A Rust + Axum Full-Stack Template'
description: 'Building type-safe full-stack apps without the TypeScript fatigue'
pubDate: '2026-03-12'
categories: ['Webdev', 'Rust']
heroImage: '/thumbnails/rust.png'
tags: ['Rust', 'Axum', 'TypeScript', 'Full-stack', 'Developer Experience']
---

I'll be honest: I'm a Rust beginner. I've spent years in the TypeScript ecosystem—Vue, Nuxt, React—and I love it. But lately, everyone keeps saying Rust is "the language of 2026" and the "chosen one for LLMs". I don't know about all that hype, but I've wanted to dig deeper into Rust for a while now.

So I did what any curious developer would do: I built a full-stack template with it.

Enter **RAVE** — **R**ust + **A**xum + **V**ite + **E**verything else you don't need.

## Why This Stack?

I like TypeScript. I came back to SPA architectures because clear separation of concerns matters to me. But I also wanted:

1. **Same-origin deployment** — Backend and frontend from the same binary, no CORS headaches
2. **Type safety without the hassle** — Let the backend define types, frontend just uses them
3. **A reason to learn Rust** — Best way to learn is to build something real

Axum seemed like the simplest way to build an API with Rust. Pair it with `serde` for serialization and `ts-rs` for TypeScript generation, and suddenly your frontend doesn't need to know anything about Rust—it just gets typed APIs.

And yes, the acronym makes for a good name. So let's go for a ride.

## The RAVE Stack

The setup is straightforward:

### Backend: Axum 0.8

Axum is the most ergonomic web framework I've found in Rust. It doesn't require understanding lifetimes or async runtimes to get started. The new 0.8 version has an even cleaner route syntax.

```rust
// backend/src/api/todos.rs
async fn get_todos(
    State(pool): State<DbPool>,
) -> Result<Json<Vec<Todo>>, AppError> {
    let todos = sqlx::query_as::<_, Todo>(
        "SELECT * FROM todos ORDER BY created_at DESC"
    )
    .fetch_all(&pool)
    .await?;

    Ok(Json(todos))
}
```

### Type Safety That Actually Works

This is where it gets interesting. Using `ts-rs`, your Rust models automatically generate TypeScript types:

```rust
// backend/src/models.rs
#[derive(TS, Serialize, Deserialize, sqlx::FromRow)]
#[ts(export, export_to = "../../frontend/src/bindings/")]
pub struct Todo {
    pub id: i64,
    pub title: String,
    pub completed: bool,
    pub created_at: chrono::DateTime<chrono::Utc>,
}
```

Run `cargo test`, and your frontend has perfect types:

```typescript
// frontend/src/bindings/models.ts
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}
```

No manual syncing. No "let me check what the API returns". The frontend doesn't even know Rust is involved—it just gets typed APIs.

### Database: SQLite

I went with SQLite because 99% of side projects don't need PostgreSQL. With WAL mode, it handles concurrent reads just fine. Using `sqlx`, you get compile-time checked queries:

```rust
let todo = sqlx::query_as::<_, Todo>(
    "INSERT INTO todos (title, completed) VALUES (?, ?) RETURNING *"
)
.bind(&todo.title)
.bind(todo.completed)
.fetch_one(&pool)
.await?;
```

### Frontend: Vite + React (or Vue)

The template ships with React, but you can use anything—Vue, Svelte, Solid. Build to `dist/`, and Axum serves it as static files. No Nginx config. No CDN setup. No Docker required.

This is where the same-origin deployment shines: one binary serves both your API and your static files.

## Developer Experience First

### Hot Reloading

Using `cargo-watch`, your backend automatically restarts when you edit `.rs` files:

```bash
# Terminal 1: Backend with hot reloading
devbox run dev:examples:todo:backend:watch

# Edit any file → server restarts automatically
# No manual Cmd+C, Cmd+V ritual
```

### Reproducible Environments

Using `devbox`, everyone gets the same dev environment:

```bash
devbox shell
# That's it. All dependencies installed.
# No "works on my machine"
```

### Zero Configuration

The template ships with sensible defaults:

- SQLite with WAL mode for concurrent reads
- CORS configured for local development
- TypeScript proxy setup in Vite
- API response standardization

## What's Not Included (On Purpose)

- ❌ **Kubernetes** — You don't need it
- ❌ **Message queues** — You don't need it
- ❌ **Microservices** — You _definitely_ don't need it
- ❌ **Complex auth** — Add it when you have users
- ❌ **GraphQL** — REST for CRUD works fine

The philosophy is simple: ship fast, validate your idea, add complexity when you actually need it.

## The Development Workflow

1. **Define your models** in Rust
2. **Run `cargo test`** to generate TypeScript types
3. **Build your frontend** with full type safety
4. **Deploy anywhere** — it's just a binary and a `dist/` folder

```bash
# Build for production
cd frontend && npm run build
cd backend && cargo build --release

# Deploy
scp target/release/rave-backend your-server:/app/
scp -r frontend/dist your-server:/app/

# Run
DATABASE_URL=sqlite:./app.db ./rave-backend
```

That's it. Your app is now running.

## Why I Built This

I've spent years in the TypeScript ecosystem. I love the developer experience. But I was curious about Rust—everyone says it's the future, and I wanted to see what the fuss was about.

The challenge? Most Rust web frameworks felt overwhelming for someone coming from TypeScript. I wanted something simple that would let me:

- Learn Rust without drowning in complexity
- Keep my TypeScript frontend
- Have type safety between backend and frontend
- Deploy everything from a single binary

RAVE is my attempt to bridge these two worlds. It's not about replacing TypeScript—it's about using Rust where it shines (backend APIs) and keeping TypeScript where it shines (frontend).

Is Rust the "language of 2026"? I don't know yet. But it's been a fun ride learning it, and building RAVE has given me a much deeper appreciation for what Rust offers.

## Should You Use It?

**Yes if:**

- You're building a side project or MVP
- You want to learn Rust practically
- You value type safety end-to-end
- You're curious about same-origin deployment

**No if:**

- You need microservices (you probably don't)
- You're building the next Facebook
- You hate compile times (Rust compiles are slower than TS builds)
- You want zero learning curve (Rust has one)

## Getting Started

```bash
git clone https://github.com/yourusername/rave-template.git
cd rave-template
devbox shell
devbox run dev:examples:todo:backend:watch
devbox run dev:examples:todo:frontend
```

Check out the [full documentation](https://github.com/yourusername/rave-template) for more details, including a complete auth guide in `AUTH.md`.

## Final Thoughts

The Vue ecosystem has given me incredible developer experiences with Nuxt 3 and Nuxt UI. But sometimes you need to step outside your comfort zone. Sometimes you need to learn something new.

RAVE is my way of learning Rust while building something useful. It's not perfect—I'm still learning, still discovering better patterns. But it works, it's type-safe, and it's been a great excuse to dive deeper into Rust.

Whether Rust is "the language of 2026" or not, I don't know. But the ride has been worth it.

---

**Made with 🦀 Rust, ⚡ Vite, and ☕ Coffee**
