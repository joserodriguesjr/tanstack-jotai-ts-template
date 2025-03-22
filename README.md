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

## Overview

This project serves as a comprehensive fullstack template designed for rapid development of web applications. It leverages modern tools and best practices for a streamlined developer experience.

<!-- todo: with built-in support for PWA. -->

## Example App - Pokedex

The template includes an example application implementing a Pokedex. It features:

- A SQLite database located in the data/ folder
- Server functions to query the database
- A search bar
- State persistence in IndexedDB

This example demonstrates how to structure and utilize the template effectively.

### Desktop View

![Pokedex - Desktop version](/public/assets/screenshot-desktop.png)

### Mobile View

![Pokedex - Mobile version](/public/assets/screenshot-mobile.png)

## Roadmap

- Implement mutations with redirects to new resources
- Integrate authentication using [Better Auth](https://www.better-auth.com/docs/installation)
- Add WebSocket and SSE support ([reference](https://nize.foo/blog/tanstack-start-websockets))
- Improve server function structure (useServerFn, ...)
- Enhance backend architecture with IoC (Inversion of Control)
- Configure environment settings for development and production
- Dockerize with PostgreSQL support
- Add PWA functionality
- Implement frontend and backend testing

## Key Features

✅ Fullstack setup with client and server integration \
✅ File-based routing powered by TanStack Router \
✅ Optimized data fetching with TanStack Query \
✅ Global state management using Jotai \
✅ Offline cache support via IndexedDB \
✅ SSR and API handlers for server-side logic \
✅ Type-safe ORM with Drizzle \
✅ Schema validation with Zod \
✅ Modern styling using Tailwind CSS + Shadcn UI \
✅ Multilanguage support with i18n \
✅ Linting and formatting via ESLint + Prettier \
✅ Git hooks with Husky and Lint Staged \
✅ FSD architecture enforced by ESLint
<!-- ✅ PWA built-in support -->

## Architecture

### Why `src/`, `app/` and `server/`?

- `src/` -> All client code
- `server/` -> All server code
- `app/` -> TanStack Start needs entry point files to be inside a root `app/` folder

### Rules

There are some set of rules in ESLint to avoid coupling layers, following Feature Sliced Design architecture:

- `src/shared` can't import any other layers  
- `src/entities` can't import `features`, `widgets` and `pages` layers
- `src/features` can't import `widgets` and `pages` layers
- `src/widgets` can't import `pages` layers
- `src/` can't import any file inside `app/`  
- Only `src/entities/<entity>/api` can import `server/`  
- `server/` can't import any file inside `src/` or `app/`  
- There can't be any cross-import inside `src/entities`, `src/features` or `src/widgets`
- Should import only from `index.ts` files

### Folder Structure

```txt
.
├── app/                       → TanStack Start entry points
├── src/
│   ├── shared/                → Reusable ui, hooks, libs and utils
│   ├── entities/              → Doman-specifc models and logic
│   ├── features/              → User interaction with app
│   ├── widgets/               → Combines features/entities
│   ├── pages/                 → Combines everything into pages
├── server/
│   ├── db/                    → Database-related files
```

## Getting Started

### Prerequisites

- Node.js v18+
- npm installed
- `.env` file with required environment variables

## Tech Stack

| Category            | Tool/Library                                      | Description |
|---------------------|------------------------------------------------|-------------|
| **Fullstack Framework** | [TanStack Start](https://tanstack.com/start) | Provides SSR and server functions. |
| **Routing** | [TanStack Router](https://tanstack.com/router) | File-based routing. |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query) | Efficient caching and server communication. |
| **State Management** | [Jotai](https://jotai.org/docs) | Atom-based global state management. |
| **ORM** | [Drizzle](https://orm.drizzle.team/) | Type-safe database queries. |
| **Validation** | [Zod](https://zod.dev/) | Schema validation. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework. |
| **Component Library** | [Shadcn](https://ui.shadcn.com/docs/components/) | Prebuilt UI components. |
| **Build System** | [Vinxi](https://vinxi.vercel.app/) (to be [removed](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch#install-dependencies:~:text=Vinxi%20will%20be%20removed%20before%20version%201.0.0)) & [Vite](https://vite.dev/) | Optimized build tool. |
| **Linting** | [ESLint](https://eslint.org/) | Code quality enforcement. |
| **Formatter** | [Prettier](https://prettier.io/) | Code formatting. |
<!-- | **Testing** | [Vitest](https://vitest.dev/) | Fast testing framework for TypeScript/JavaScript. | -->

<!-- TODO -->
<!-- And [React Spring](https://www.react-spring.dev/) for animations. -->
<!-- **Pattern:** Colocation + MVVM? -->
<!-- **Inputs Validation:** React Hook Form + Zod -->
<!-- **Deploy:** Dokploy + Nixpacks -->

## FAQ

### How do I add a new route?

Create a new file in `/app/routes/`. For example, adding `/app/routes/about.tsx` automatically creates the `/about` page (in development mode).

### How do I connect to a database?

Configure Drizzle ORM by defining your schema in `/app/db/schema.ts` and updating your `.env` file accordingly. Refer to the [Drizzle documentation](https://orm.drizzle.team/docs/get-started) for details.

### How is cache and state managed?

- Loaders run on the client during navigation but execute on the server on full-page reloads.
- Use Jotai for sharing state between components, particularly for filters and search parameters.

## Why Choose TanStack Start Over Next.js?

### Streaming SSR

TanStack Start streams content progressively, enhancing interactivity. In contrast, Next.js can block rendering while waiting for data.

### Client-First Philosophy

TanStack Start is optimized for dynamic, real-time apps with offline support, focusing on responsiveness rather than traditional SSR/SEO.

### Flexibility Over Convention

While Next.js provides strong conventions for rapid development, TanStack Start offers more customization and control.

### Deployment and Lock-In Considerations

TanStack Start supports flexible deployment (e.g., Netlify, Vercel, Cloudflare, Node.js, Bun) without vendor lock-in. Next.js, while powerful, is tightly integrated with Vercel.

## References

[TanStack Start: A New Framework Revolutionizing React Development](https://medium.com/learnwithrahul/tanstack-start-a-new-framework-revolutionizing-react-development-4143de93fc7e)
