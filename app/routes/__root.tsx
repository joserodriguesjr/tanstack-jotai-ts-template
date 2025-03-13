import type { ReactNode } from "react";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";
import globalCss from "@/assets/global.css?url";
import HydrationProvider from "@/components/HydrationProvider";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "Pokedex App",
        description: `A PWA for browsing Pokémon data. `,
      },
    ],
    links: [
      { rel: "stylesheet", href: globalCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "apple-touch-icon", sizes: "192x192", href: "/logo192.png" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: notFound,
});

function RootComponent() {
  return (
    <>
      <RootDocument>
        <HydrationProvider>
          <Outlet />
        </HydrationProvider>
      </RootDocument>
    </>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <TanStackRouterDevtools position="bottom-right" />
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
