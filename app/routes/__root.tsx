import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { type ReactNode, useEffect } from 'react';

import globalCss from '@/shared/assets/global.css?url';
import HydrationProvider from '@/shared/components/hydration-provider';
import { Toaster } from '@/shared/components/ui/sonner';
import { useTheme } from '@/shared/hooks/use-theme';

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
      { rel: 'apple-touch-icon', sizes: '192x192', href: 'icons/logo192.png' },
    ],
  }),
  component: RootComponent,
  notFoundComponent: notFound,
});

function RootComponent() {
  const { theme } = useTheme();

  // TODO: Não está da melhor forma
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <RootDocument>
      <HydrationProvider>
        <Outlet />
      </HydrationProvider>
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
        <main>{children}</main>
        <Toaster position="top-right" richColors />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <TanStackRouterDevtools position="bottom-right" />

        {/* <ScriptOnce> TODO
					{`document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )`}
				</ScriptOnce> */}

        <Scripts />
      </body>
    </html>
  );
}

function notFound() {
  return (
    <div className="p-2">
      <p>This is the notFoundComponent configured on root route</p>
      <Link className="text-[#61dafb] hover:underline" to="/">
        Start Over
      </Link>
    </div>
  );
}
