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

This project serves as a comprehensive fullstack template designed for rapid development of web applications with built-in support for PWA. It leverages modern tools and best practices for a streamlined developer experience.

## Example App - Pokedex

The template includes an example application implementing a Pokedex. It features:

- A SQLite database located in the data/ folder
- Server functions to query the database
- A search bar
- State persistence in IndexedDB
- Offline support with service worker

This example demonstrates how to structure and utilize the template effectively.

### Desktop View

![Pokedex - Desktop version](/public/assets/screenshot-desktop.png)

### Mobile View

![Pokedex - Mobile version](/public/assets/screenshot-mobile.png)

## Roadmap

### Template

- Implement mutations with redirects to new resources
- Integrate authentication using [Better Auth](https://www.better-auth.com/docs/installation)
- Add WebSocket and SSE support ([reference](https://nize.foo/blog/tanstack-start-websockets))
- Implement frontend testing (cypress (<https://github.com/profydev/prolog-app/tree/main?tab=readme-ov-fileests>))
- Configure environment settings for development and production
- Project configuration through env
- Improve SW (caches, add metadata, auth?)
- Implement Zod (validateSearchParams)
- Dockerize with PostgreSQL support
- Buildpack / nimpacks (dokploy with nixpacks) | Vercel
- Error monitoring (Sentry, new relic, rollbar, bugsnag)
- Admin page (headless CMS?)
- Pocketbase
- Remove eslint-disable from files
- Share types between server functions and client code?
- Integrate hooks for payment and external APIs
- Fix mobile experience (useIsMobile hook?)
- Add monitoring (<https://www.datadoghq.com/blog/monitoring-mean-stack-applications-with-datadog/>)
- Add webtracking (UTMs, for A/B tests, etc...)

### Pokedex

- Filter by element (select)
- Favorite pokemon

## Key Features

### Project

✅ Linting and formatting via ESLint + Prettier \
✅ Git hooks with Husky and Lint Staged

### Client

✅ PWA built-in support \
✅ File-based routing powered by TanStack Router \
✅ Optimized data fetching with TanStack Query \
✅ Global state management using Jotai \
✅ Offline cache support via IndexedDB (Synced with react query) \
✅ Schema validation with Zod \
✅ Modern styling using Tailwind CSS + Shadcn UI \
✅ Skeleton UI to prevent hydration error \
✅ Multilanguage support with i18n \
✅ FSD-like architecture enforced by ESLint

### Server

✅ SSR, Server functions and API handlers \
✅ Type-safe ORM with Drizzle \
✅ IoC pattern \
✅ Logger using winston
✅ Tests using Vitest

## Good for (TODO)

This is template is suitable for these types of application:

- E-commerce
- Custom blog
- Hub
- Internal management system

## Architecture

### Rules

There are some set of rules in ESLint to avoid coupling layers, following Feature Sliced Design architecture:

- `app/shared` can't import any other layers  
- `app/entities` can't import `features`, `widgets` and `pages` layers
- `app/features` can't import `widgets` and `pages` layers
- `app/widgets` can't import `routes` layers
- Only `app/entities/<entity>/api` can import `server/`  
- `server/` can't import any file inside `app/`  
- There can't be any cross-import inside `app/entities`, `app/features` or `app/widgets`
- Should import only from `index.ts` files (you need to add `eslint-disable import/no-internal-modules` rule inside them)

### Folder Structure (todo: improve)

```txt
.
├── app/                       → TanStack Start entry points
│   ├── shared/                → Reusable ui, hooks, libs and utils
│   ├── entities/              → Doman-specifc models and logic
│   ├── features/              → User interaction with app
│   ├── widgets/               → Combines features/entities
│   ├── routes/                → Define pages with file router
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

### The route loading lifecycle

Every time a URL/history update is detected, the router executes the following sequence:

- Route Matching (Top-Down)
  - route.params.parse
  - route.validateSearch
- Route Pre-Loading (Serial)
  - route.beforeLoad
  - route.onError
    - route.errorComponent / parentRoute.errorComponent / router.defaultErrorComponent
- Route Loading (Parallel)
  - route.component.preload?
  - route.loader
    - route.pendingComponent (Optional)
    - route.component
  - route.onError
    - route.errorComponent / parentRoute.errorComponent / router.defaultErrorComponent

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
