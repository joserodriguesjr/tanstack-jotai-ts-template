import { dehydrate, hydrate, QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routerWithQueryClient } from '@tanstack/react-router-with-query';
import { Provider as JotaiProvider } from 'jotai';
import { StrictMode } from 'react';

import { routeTree } from '@/routeTree.gen';
import { DefaultCatchBoundary } from '@/shared/components/default-catch-boundary';
import { SwPrompt } from '@/shared/components/sw-prompt';
import { createIDBPersister } from '@/shared/lib/indexed-db';
import { queryConfig } from '@/shared/lib/react-query';

export function createRouter() {
  console.log('🔥 createRouter() is running!');
  const queryClient = new QueryClient({ defaultOptions: queryConfig });
  const persister = createIDBPersister();

  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      defaultPreload: 'intent',
      defaultPreloadStaleTime: 0,
      defaultErrorComponent: DefaultCatchBoundary,
      scrollRestoration: true,
      defaultStructuralSharing: true,
      context: { queryClient },
      dehydrate: () => {
        return {
          queryClientState: dehydrate(queryClient),
        };
      },
      hydrate: (dehydrated) => {
        hydrate(queryClient, dehydrated.queryClientState);
      },
      Wrap: ({ children }) => {
        return (
          <>
            <StrictMode>
              <PersistQueryClientProvider
                client={queryClient}
                persistOptions={{
                  persister,
                  maxAge: 1000 * 60 * 60 * 24, // 24 hours
                }}
                onSuccess={() => {
                  queryClient.resumePausedMutations();
                  // .then(() => queryClient.invalidateQueries());
                }}
              >
                <JotaiProvider>
                  <SwPrompt />
                  {children}
                </JotaiProvider>
              </PersistQueryClientProvider>
            </StrictMode>
          </>
        );
      },
    }),
    queryClient,
  );
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
