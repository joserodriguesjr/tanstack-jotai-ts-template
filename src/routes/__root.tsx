import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from '@tanstack/react-query'
import Header from '@/components/Header';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => (
    <>
      <Header />
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
  notFoundComponent: () => {
    return (
      <div className="p-2">
        <p>This is the notFoundComponent configured on root route</p>
        <Link className="text-[#61dafb] hover:underline" to="/">Start Over</Link>
      </div>
    )
  },
})