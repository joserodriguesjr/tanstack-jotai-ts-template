<center>
  <a href="https://github.com/joserodriguesjr/tanstack-jotai-ts-template">
    <img src="./public/assets/blueprint-512x384.png" height="150" alt="Logo">
  </a>

# Template for Fullstack App

The definitive template for your next application.

[Learn more »](https://<website>..com)

[Discord](https://discord.gg/<link>) · [Website](https://<website>.com)  · [Issues](https://github.com/joserodriguesjr/tanstack-jotai-ts-template/issues)
</center>

## Purpose

This project serves as a full-stack app template, providing a solid foundation for web applications with support for PWA. It enables rapid development using [modern tools](#tech-stack).

## Next Steps

- Auth using Better Auth  (<https://www.better-auth.com/docs/installation> / <https://www.better-auth.com/docs/basic-usage> / <https://www.better-auth.com/docs/integrations/tanstack>)
- PWA support
- Server Functions structure (useServerFn, ...)
- Docker with PostgreSQL
- Backend architecture -> Controller <-> Service <-> Repository
- Env configuration for DEV and PRD
- i18n for multilanguage support
- WebSocket and SSE implementation <https://nize.foo/blog/tanstack-start-websockets/>
- Mutations (with redirect to new resource)
- Testar initial data com dados meio prontos E setar time pra encher tudo dps

## Features

✅ Full-stack setup – Includes both client and server logic \
✅ File-based routing – Powered by TanStack Router \
✅ Optimized Data Fetching – TanStack Query for caching & server communication \
✅ Global State Management – Jotai with a shared cache with TanStack Query \
✅ Offline Cache – IndexedDB for caching TanStack Query cache \
✅ SSR & API Handlers – Server-side rendering and server functions \
✅ Type-safe ORM – Drizzle ORM for database management \
✅ Schema validation - Zod validation library \
✅ Modern Styling – Tailwind CSS + Shadcn UI components \
<!-- ✅ PWA – Service workers configured -->

## Folder Structure

```txt
.
├── app/
│   ├── assets/                → Static assets included in the client bundle
│   ├── atoms/                 → Global state management (e.g., theme, auth, ...)
│   ├── components/            → Shared UI components
│   ├── config/                → Global configurations (e.g., API, environment settings)
│   ├── constants/             → Reusable constants (e.g., messages, roles, ...)
│   ├── db/                    → Database related files
│   ├── hooks/                 → Global hooks
│   ├── lib/                   → Wrappers for external libraries
│   ├── utils/                 → Utility functions (e.g., formatters, helpers)
│   ├── modules/               → Feature-based modules, each with:
│   │   ├── api/               → API wrappers
│   │   ├── atoms/             → Local state management (e.g., filters, toogles, ...)
│   │   ├── components/        → Module-specific UI components
│   │   ├── hooks/             → Custom hooks
│   │   ├── pages/             → Module pages that will be rendered
│   │   ├── server/            → Server-side functions
│   │   ├── module.schema.ts   → Schema definitions for module
│   ├── routes/                → Application pages
│   │   ├── __root.tsx         → App-wide settings (head, meta, layout)
│   │   ├── index.tsx          → Homepage (/)
│   │   ├── moduleA/
│   │   │   ├── index.tsx      → Page for /moduleA
│   │   │   ├── route.tsx      → Layout for /moduleA
│   │   │   ├── $id.tsx        → Dynamic route for /moduleA/$id
```

## Getting Started

### Prerequisites

- Node.js v18+
- npm or pnpm installed
- A .env file with required environment variables

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/project-name.git
cd project-name
npm install
```

### Development Server

Run the app in development mode:

```bash
npm run dev
```

This will start the server at `http://localhost:3000/`.

## Building For Production

To build this application for production:

```bash
npm run build
```

## How the server side works?

### Client-First

TanStack Start follows a client-first approach for it's fullstack capabilities. In contrast to Next.js where everything is designed with a server-first approach in mind.

There are only a few places where code is executed on the server that you need to be aware of. Other than that, they make it very clear where things run. These are the main ones:

- ssr.tsx (the entry point)
- The return of the .handler() methods in createServerFn
- The return of the .server() methods in createMiddleware
- The custom /api/ directory
- Route loaders run in the server when you reload the page (the first render, thus not having access to client storages)

## FAQ

### How do I add a new route?

Just create a new file in /app/routes.

For example, creating '/app/routes/about.tsx' will create a new /about page automatically (You need to be running in the development mode).

### How do I connect to a database?

The project uses Drizzle ORM. Configure your database in the .env file and define your schema in /app/db/schema.ts.

See the [get started](https://orm.drizzle.team/docs/get-started) from the offical documentation for more informations.

### How to manage cache / state?

Loader runs when navigating from the client

If the page is reloaded (f5) or accessed from direct URL, the loader will not have been hydrated with the cache and it'll run on the server

TanStack Query
Jotai
IndexedDB

## Tech Stack

| Category            | Tool/Library                                      | Description |
|---------------------|------------------------------------------------|-------------|
| **SSR + Server Functions** | [TanStack Start](https://tanstack.com/start) | Generates the server functions. |
| **Routing** | [TanStack Router](https://tanstack.com/router) | File-based router, managing routes in `app/routes`. |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query) | Fetches and caches data efficiently. |
| **Cache** | [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) | Caches data in client machine for offline support. |
| **State Management** | [Jotai](https://jotai.org/docs) | Bottom-up state management using atoms. |
| **ORM** | [Drizzle](https://orm.drizzle.team/) | Database ORM for type-safe queries. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework. |
| **Component Library** | [Shadcn](https://ui.shadcn.com/docs/components/) | Prebuilt UI components for styling. |
| **Build System** | [Vinxi](https://vinxi.vercel.app/) (to be [removed](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch#install-dependencies:~:text=Vinxi%20will%20be%20removed%20before%20version%201.0.0)) & [Vite](https://vite.dev/) | Build tools for optimizing development and production builds. |
| **Testing** | [Vitest](https://vitest.dev/) | Fast testing framework for TypeScript/JavaScript. |

<!-- And [React Spring](https://www.react-spring.dev/) for animations. -->
<!-- **Pattern:** Colocation + MVVM? -->
<!-- **Inputs Validation:** React Hook Form + Zod -->
<!-- **Deploy:** Dokploy + Nixpacks -->