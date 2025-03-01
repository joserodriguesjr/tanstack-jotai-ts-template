import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from './routeTree.gen.ts'

export const queryClient = new QueryClient();
export function createRouter() {

    return routerWithQueryClient(
        createTanStackRouter({
            routeTree,
            context: { queryClient },
            defaultPreload: 'intent',
            // Since we're using React Query, we don't want loader calls to ever be stale
            // This will ensure that the loader is always called when the route is preloaded or visited
            defaultPreloadStaleTime: 0,
            scrollRestoration: true,
            defaultStructuralSharing: true,
        }),
        queryClient
    )
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createRouter>
    }
}

