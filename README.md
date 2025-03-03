# Purpose

This project serves as a full-stack app template, providing a solid foundation for web applications with built-in server functions, data fetching, state management, routing, and styling.
It enables rapid development using modern tools like TanStack Router, Jotai, Drizzle ORM, and Tailwind CSS.

## Features

✅ Full-stack setup – Includes both client and server logic\
✅ File-based routing – Powered by TanStack Router\
✅ Optimized Data Fetching – TanStack Query for caching & server communication\
✅ Global State Management – Jotai with a shared cache\
✅ SSR & API Handlers – Server-side rendering and server functions\
✅ Type-safe ORM – Drizzle ORM for database management\
✅ Modern Styling – Tailwind CSS + Shadcn UI components

## Folder Structure

```txt
.
├── app/
│   ├── assets/            → Static assets included in the client bundle
│   ├── atoms/             → Global state management (e.g., theme, auth, ...)
│   ├── components/        → Shared UI components
│   ├── config/            → Global configurations (e.g., API, environment settings)
│   ├── constants/         → Reusable constants (e.g., messages, roles, ...)
│   ├── lib/               → Wrappers for external libraries
│   ├── utils/             → Utility functions (e.g., formatters, helpers)
│   ├── modules/           → Feature-based modules, each with:
│   │   ├── actions/       → Server-side functions
│   │   ├── api/           → API wrappers and associated atoms
│   │   ├── components/    → Module-specific UI components
│   │   ├── hooks/         → Custom hooks
│   ├── routes/            → Application pages
│   │   ├── __root.tsx     → App-wide settings (head, meta, layout)
│   │   ├── index.tsx      → Homepage (/)
│   │   ├── moduleA/
│   │   │   ├── index.tsx  → Page for /moduleA
│   │   │   ├── route.tsx  → Layout for /moduleA
│   │   │   ├── $id.tsx    → Dynamic route for /moduleA/$id
├── drizzle/               → Database schema and migrations
│   │   ├── migrations/    → Drizzle migrations
│   │   ├── schema.ts      → Database schema definitions
│   │   └── db.ts          → Database connection and utilities
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

## Key Files

- client.tsx → Initializes the client with TanStack Query and Jotai
- router.tsx → Centralized router configuration for client & server
- ssr.tsx → Injects router into the server for SSR support
- routeTree.gen.ts → Auto-generated route definitions from TanStack Router

## FAQ

### How do I add a new route?

Just create a new file in ./app/routes.

For example, ./app/routes/about.tsx will create a new /about page.

### How do I connect to a database?

The project uses Drizzle ORM. Configure your database in the .env file and define your schema in ./app/db/schema.ts.

See the [get started](https://orm.drizzle.team/docs/get-started) for more informations.

## Tech Stack

| Category            | Tool/Library                                      | Description |
|---------------------|------------------------------------------------|-------------|
| **SSR + Server Functions** | [TanStack Start](https://tanstack.com/start) | Generates the server functions. |
| **Routing** | [TanStack Router](https://tanstack.com/router) | File-based router, managing routes in `app/routes`. |
| **ORM** | [Drizzle](https://orm.drizzle.team/) | Database ORM for type-safe queries. |
| **Data Fetching + Cache** | [TanStack Query](https://tanstack.com/query) | Fetches and caches data efficiently. |
| **State Management** | [Jotai](https://jotai.org/docs) | Bottom-up state management using atoms. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework. |
| **Component Library** | [Shadcn](https://ui.shadcn.com/docs/components/) | Prebuilt UI components for styling. |
| **Build System** | [Vinxi](https://vinxi.vercel.app/) (to be [removed](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch#install-dependencies:~:text=Vinxi%20will%20be%20removed%20before%20version%201.0.0)) & [Vite](https://vite.dev/) | Build tools for optimizing development and production builds. |
| **Testing** | [Vitest](https://vitest.dev/) | Fast testing framework for TypeScript/JavaScript. |

<!-- And [React Spring](https://www.react-spring.dev/) for animations. -->
<!-- **Pattern:** Colocation + MVVM? -->
<!-- **Inputs Validation:** React Hook Form + Zod -->
<!-- **Deploy:** Dokploy + Nixpacks -->