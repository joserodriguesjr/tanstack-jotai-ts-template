import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { type ReactNode } from 'react';

import globalCss from '@/shared/assets/global.css?url';
import { DefaultCatchBoundary } from '@/shared/components/default-catch-boundary';
import { NotFound } from '@/shared/components/not-found';
import { Toaster } from '@/shared/components/ui/sonner';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: 'Pokedex',
        description: `A PWA for browsing Pokémon data. (__ROOT) `,
      },
    ],
    links: [
      { rel: 'stylesheet', href: globalCss },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'manifest', href: '/manifest.json' },
      {
        rel: 'apple-touch-icon',
        sizes: '192x192',
        href: '/icons/blueprint-192x192.png',
      },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <main>
          {children}
          <Toaster position="top-right" richColors />
        </main>
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <TanStackRouterDevtools position="top-left" />
        <Scripts />
      </body>
    </html>
  );
}
