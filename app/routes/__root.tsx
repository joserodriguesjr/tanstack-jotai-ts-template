import type { ReactNode } from 'react'
import { createRootRouteWithContext, Link, Outlet, HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from '@tanstack/react-query'
import Header from '@/components/Header';
import globalCss from "@/assets/global.css?url"
import { seo } from '@/utils/seo';

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            ...seo({
                title: 'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
                description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
            }),
        ],
        links: [
            { rel: 'stylesheet', href: globalCss },
            { rel: 'icon', href: '/favicon.ico' },
            { rel: 'manifest', href: '/manifest.json', color: '#fffff' },
            {
                rel: 'apple-touch-icon',
                sizes: '192x192',
                href: '/logo192.png',
            },
        ]
    }),
    component: RootComponent,
    notFoundComponent: notFound
})

function RootComponent() {
    return (
        <>
            <RootDocument>
                <Header />
                <Outlet />
            </RootDocument>
        </>
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <ReactQueryDevtools buttonPosition="top-right" />
                <TanStackRouterDevtools position="bottom-right" />
                <Scripts />
            </body>
        </html>
    )
}

function notFound() {
    return (
        <div className="p-2">
            <p>This is the notFoundComponent configured on root route</p>
            <Link className="text-[#61dafb] hover:underline" to="/">Start Over</Link>
        </div>
    )
}