---
title: 'RAVE: The Full-Stack Rust Template That Respects Your TypeScript'
description: 'Rust backend, TypeScript frontend, one binary, zero friction'
pubDate: '2026-03-12'
updatedDate: '2026-06-12'
categories: ['Webdev', 'Rust']
heroImage: '/thumbnails/rust.png'
tags: ['Rust', 'Axum', 'TypeScript', 'Full-stack', 'Developer Experience']
---

**RAVE** is **R**ust + **A**xum + **V**ite + **E**verything else you don't need. It's a full-stack template where the backend writes your TypeScript types for you — then serves both API and frontend from a single binary.

```bash
git clone https://github.com/DnzzL/rave-template.git
cd rave-template && devbox shell
devbox run dev:examples:todo:backend:watch   # Rust hot-reloads
devbox run dev:examples:todo:frontend        # Vite dev server
```

No Docker. No Nginx. No Kubernetes degree required.

## What Makes RAVE Different from Other Rust Starters

The Rust full-stack ecosystem has options, but they all make you compromise.

|                      | **RAVE**                          | **Tauri**                   | **Leptos / Yew**              | **Axum + manual setup**        |
|----------------------|-----------------------------------|-----------------------------|-------------------------------|--------------------------------|
| Frontend             | Your framework (React, Vue, etc.) | Webview (no real browser)   | Rust WASM (new framework)     | Your framework                 |
| Type safety          | Auto-generated (ts-rs)            | Manual IPC types            | Rust-only                     | Manual sync                    |
| Deployment           | Single binary                     | Native binary                | WASM + separate backend       | Binary + static files          |
| Learning curve       | Know TypeScript? You're ready     | Need Tauri + Rust knowledge | Need a new frontend paradigm  | Need to wire everything up     |
| CORS                 | None (same-origin)                | None (native)               | Needs proxy                   | Needs proxy or CORS config     |

**Every other Rust starter** forces you to either learn a new frontend framework (Leptos, Yew, Dioxus) or deal with CORS, proxy configs, and manual type syncing.

**RAVE lets you keep your existing TypeScript skills** — React, Vue, Svelte, whatever — and get Rust on the backend without the integration headaches.

## The "Wow" Demo: Your Types, Automatically

This is the part that made me stop and smile when I first got it working.

Define your model in Rust once:

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
// frontend/src/bindings/models.ts — auto-generated, never touch this file
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}
```

Use them with full type safety:

```typescript
async function getTodos(): Promise<Todo[]> {
  const res = await fetch('/api/todos');
  return res.json(); // ← Fully typed. No `any`. No manual d.ts files.
}
```

**Your backend is the source of truth for types.** No more "let me check what the API returns" or keeping a Postman collection alive. Change a field in Rust, re-run tests, and your frontend instantly knows about it. TypeScript catches mismatches at compile time, not runtime.

## Same-Origin Deployment: Why CORS Is Someone Else's Problem

Most full-stack setups serve frontend and backend on different ports/domains → CORS headers → preflight requests → "why isn't this working in production?" head-scratches.

RAVE serves the `frontend/dist/` folder as static files from the Axum binary. Your API lives at `/api/`, your frontend at `/`. Same origin, no CORS, no proxy config in production.

```bash
cd frontend && npm run build
cd backend && cargo build --release

# Deploy to any VPS
scp target/release/rave-backend your-server:/app/
scp -r frontend/dist your-server:/app/
DATABASE_URL=sqlite:./app.db ./rave-backend

# That's it. Your app is live.
```

## What's Not Included (And Why That's The Point)

- ❌ **Kubernetes** — You don't need it for a side project
- ❌ **Message queues** — Add them when you have a queue problem
- ❌ **Microservices** — You _definitely_ don't need it yet
- ❌ **Complex auth** — There's an `AUTH.md` for when you do
- ❌ **GraphQL** — REST with compile-time checked queries works fine

The template ships the absolute minimum to be productive immediately:

- SQLite with WAL mode (99% of projects don't need PostgreSQL)
- `cargo-watch` for instant server restarts on `.rs` changes
- `devbox` for reproducible environments
- API response standardization
- TypeScript proxy setup in Vite for development

## Who RAVE Is For

**You should use RAVE if:**
- You want Rust on the backend without giving up your TypeScript frontend
- You're tired of manually syncing API types between frontend and backend
- You want deployment to be `scp` + `run` — no Dockerfile, no CI pipeline
- You want to build side projects that could actually scale if they take off

**You should NOT use RAVE if:**
- You need to learn a new frontend paradigm (go use Leptos/Yew)
- You're building the next Facebook (hire a DevOps team)
- You hate compile times (Rust compiles slower than TS, that's life)
- You need PostgreSQL today (swap the SQLite URL, the rest works)

## The RAVE Promise

I built RAVE because I wanted Rust on the backend without the usual friction. The type safety, the same-origin deployment, the `cargo test → types` pipeline — these aren't gimmicks. They solve real problems I hit when I tried to use other Rust stacks.

**If you know TypeScript and want Rust on the server, RAVE is the shortest path there.**

Check out the [full documentation](https://github.com/DnzzL/rave-template) including the [auth guide in `AUTH.md`](https://github.com/DnzzL/rave-template/blob/main/AUTH.md).

---

**RAVE: Rust backend, TypeScript frontend, one binary, zero friction.**
