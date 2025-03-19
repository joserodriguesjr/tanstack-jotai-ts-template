<p align="center">
  <a href="https://github.com/joserodriguesjr/tanstack-jotai-ts-template">
    <img src="./public/assets/blueprint-512x384.png" height="150" alt="Logo">
  </a>

  <h1 align="center">Template for Fullstack App</h1>

  <p align="center">
  The definitive template for your next application.
  <br />
  <a href="https://<website>..com"><strong>Learn more »</strong></a>
  <br />
  <br />
    <a href="https://discord.gg/<link>">Discord</a>
    ·
    <a href="https://<website>.com">Website</a>
    ·
    <a href="https://github.com/joserodriguesjr/tanstack-jotai-ts-template/issues">Issues</a>
  </p>
</p>

## Purpose

This project serves as a full-stack app template, providing a solid foundation for web applications with support for PWA. It enables rapid development using [modern tools](#tech-stack).

## Example App - Pokedex

This template comes with an example app where a Pokedex is implemented. The data is inside a SQLite in data folder. It has server functions that queries it, a search bar and state stored in IndexedDB. You can take a look to see how the template its supposed to work.

### Desktop Page

![Pokedex - Desktop version](/public/assets/screenshot-desktop.png)

### Mobile Page

![Pokedex - Mobile version](/public/assets/screenshot-mobile.png)

## Next Steps

- Mutations (with redirect to new resource)
- Auth using Better Auth  (<https://www.better-auth.com/docs/installation> / <https://www.better-auth.com/docs/basic-usage> / <https://www.better-auth.com/docs/integrations/tanstack>)
- WebSocket and SSE implementation <https://nize.foo/blog/tanstack-start-websockets/>
- Server Functions structure (useServerFn, ...)
- Backend architecture -> IOC
- Env configuration for DEV and PRD
- Docker with PostgreSQL
- PWA support
- Tests in front and back

## Features

✅ Full-stack Setup – Includes both client and server logic \
✅ File-based Routing – Powered by TanStack Router \
✅ Optimized Data Fetching – TanStack Query for caching & server communication \
✅ Global State Management – Jotai for atom state management \
✅ Offline Cache – IndexedDB for caching TanStack Query cache \
✅ SSR & API Handlers – Server-side rendering and server functions \
✅ Type-safe ORM – Drizzle ORM for database management \
✅ Schema Validation - Zod validation library \
✅ Modern Styling – Tailwind CSS + Shadcn UI components \
✅ Multilanguage Support – i18n for multilanguage \
✅ Linting + Formatter – ESLint with Prettier for enhanced developer experience \
✅ Git Hooks – Husky and Lint Staged ensuring good practices \
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
git clone https://github.com/joserodriguesjr/tanstack-jotai-ts-template.git
cd tanstack-jotai-ts-template
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
npm run start
```

## Tech Stack

| Category            | Tool/Library                                      | Description |
|---------------------|------------------------------------------------|-------------|
| **SSR + Server Functions** | [TanStack Start](https://tanstack.com/start) | Generates the server functions. |
| **Routing** | [TanStack Router](https://tanstack.com/router) | File-based router, managing routes in `app/routes`. |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query) | Fetches and caches data efficiently. |
| **Cache** | [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) | Caches data in client machine for offline support. |
| **State Management** | [Jotai](https://jotai.org/docs) | Bottom-up state management using atoms. |
| **ORM** | [Drizzle](https://orm.drizzle.team/) | Database ORM for type-safe queries. |
| **Validation** | [Zod](https://zod.dev/) | TypeScript-first schema validation with static type inference. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework. |
| **Component Library** | [Shadcn](https://ui.shadcn.com/docs/components/) | Prebuilt UI components for styling. |
| **Build System** | [Vinxi](https://vinxi.vercel.app/) (to be [removed](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch#install-dependencies:~:text=Vinxi%20will%20be%20removed%20before%20version%201.0.0)) & [Vite](https://vite.dev/) | Build tools for optimizing development and production builds. |
| **Linting** | [ESLint](https://eslint.org/) | Statical analyzer to ensure rules. |
| **Formatter** | [Prettier](https://prettier.io/) | Formatter keeping code standardized. |
<!-- | **Testing** | [Vitest](https://vitest.dev/) | Fast testing framework for TypeScript/JavaScript. | -->

<!-- TODO -->
<!-- And [React Spring](https://www.react-spring.dev/) for animations. -->
<!-- **Pattern:** Colocation + MVVM? -->
<!-- **Inputs Validation:** React Hook Form + Zod -->
<!-- **Deploy:** Dokploy + Nixpacks -->

## FAQ

### How do I add a new route?

Create a new file in /app/routes.

For example, creating '/app/routes/about.tsx' will create a new /about page automatically (You need to be running in the development mode).

### How do I connect to a database?

The project uses Drizzle ORM. Configure your database in the .env file and define your schema in /app/db/schema.ts.

See the [get started](https://orm.drizzle.team/docs/get-started) from the offical documentation for more informations.

### How to manage cache / state?

Keep in mind that the Loader runs when navigating from the client. If the page is reloaded (F5) or accessed from direct URL, the loader will not have been hydrated with the cache and it'll run on the server.

For managing filters, search params and other states that could be used between components - use Jotai to share them.

## How is TanStack Start different from Next.js?

### Streaming SSR

Unlike Next.js, which can block rendering while waiting for data, TanStack Start streams critical content immediately, loading slower data incrementally. This results in faster page interactivity.

### Client-First Philosophy

TanStack Start excels in dynamic, real-time apps with offline capabilities, such as dashboards or collaboration tools. While Next.js focuses on SSR and SEO, TanStack Start prioritizes responsiveness and interactivity.

It follows a client-first approach for it's fullstack capabilities. In contrast to Next.js where everything is designed with a server-first approach in mind.

#### Code Execution

There are only a few places where code is executed on the server that you need to be aware of. Other than that, they make it very clear where things run. These are the main ones:

- ssr.tsx (the entry point)
- The return of the .handler() methods in createServerFn
- The return of the .server() methods in createMiddleware
- The custom /api/ directory
- Route loaders run in the server when you reload the page (the first render, thus not having access to client storages)

### Isomorphic Loaders

TanStack Start’s loaders work seamlessly on both the server and client, reducing code duplication compared to Next.js’s getServerSideProps or getStaticProps.

### Flexibility Over Convention

Next.js is great for rapid prototyping with its conventions but can feel restrictive in complex projects. TanStack Start provides granular control, suiting projects requiring customization.

### Deployment and Lock-In Considerations

#### TanStack Start

- Flexible Deployment: Deploy anywhere compatible with Node.js, including serverless functions.
- No Vendor Lock-In: Maintain control over your infrastructure.
- Out-of-the-box preset support for various popular platforms to run your application — Netlify , Vercel, Cloudflare-pages, Node JS server or a Bun Server

#### Next.js

- Optimized for Vercel: This offers additional features like Edge Functions, but relying on them could lead to vendor lock-in.
- Cost Considerations: Unnecessary SSR can increase costs on serverless platforms like Vercel.
TanStack Start’s flexibility makes it ideal for teams wanting independence.

## References

[TanStack Start: A New Framework Revolutionizing React Development](https://medium.com/learnwithrahul/tanstack-start-a-new-framework-revolutionizing-react-development-4143de93fc7e)
