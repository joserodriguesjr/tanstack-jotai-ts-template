import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { dehydrate, hydrate, QueryClient } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen.ts";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createIDBPersister } from "./lib/indexedDb.ts";
import { Provider as JotaiProvider } from "jotai";
import { useHydrateAtoms } from "jotai/react/utils";
import { queryClientAtom } from "jotai-tanstack-query";

export function createRouter() {
  // Make sure you create your loader client or similar data
  // stores inside of your `createRouter` function. This ensures
  // that your data stores are unique to each request and
  // always present on both server and client.
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        networkMode: "offlineFirst",
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });

  const persister = createIDBPersister();

  const HydrateAtoms = ({ children }: { children: React.ReactNode }) => {
    useHydrateAtoms([[queryClientAtom, queryClient]]);
    return children;
  };

  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      // Optionally provide your loaderClient to the router context for
      // convenience (you can provide anything you want to the router
      // context!)
      context: { queryClient },
      // On the server, dehydrate the loader client so the router
      // can serialize it and send it to the client for us
      dehydrate: () => {
        return {
          queryClientState: dehydrate(queryClient),
        };
      },
      // On the client, hydrate the loader client with the data
      // we dehydrated on the server
      hydrate: (dehydrated) => {
        hydrate(queryClient, dehydrated.queryClientState);
      },
      // Optionally, we can use `Wrap` to wrap our router in the loader client provider
      Wrap: ({ children }) => {
        return (
          <PersistQueryClientProvider
            onSuccess={() =>
              queryClient
                .resumePausedMutations()
                .then(() => queryClient.invalidateQueries())
            }
            client={queryClient}
            persistOptions={{
              persister,
              //   maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            }}
          >
            <JotaiProvider>
              <HydrateAtoms>{children}</HydrateAtoms>
            </JotaiProvider>
          </PersistQueryClientProvider>
        );
      },
      defaultPreload: "intent",
      // Since we're using React Query, we don't want loader calls to ever be stale
      // This will ensure that the loader is always called when the route is preloaded or visited
      defaultPreloadStaleTime: 0,
      scrollRestoration: true,
      defaultStructuralSharing: true,
    }),
    queryClient,
  );
}

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
