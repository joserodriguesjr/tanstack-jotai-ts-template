/// <reference types="vinxi/types/client" />
import React from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { Provider as JotaiProvider } from 'jotai'
import { useHydrateAtoms } from 'jotai/react/utils'
import { queryClientAtom } from 'jotai-tanstack-query';
import { createRouter, queryClient } from './router'
import reportWebVitals from './reportWebVitals';
import { ErrorFallback } from './components/ErrorFallback';
import { createIDBPersister } from './lib/indexedDb';

const persister = createIDBPersister()

const router = createRouter()

const HydrateAtoms = ({ children }: { children: React.ReactNode }) => {
    useHydrateAtoms([[queryClientAtom, queryClient]])
    return children
}

hydrateRoot(document,
    <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PersistQueryClientProvider
            onSuccess={() =>
                queryClient
                    .resumePausedMutations()
                    .then(() => queryClient.invalidateQueries())
            }
            client={queryClient}
            persistOptions={{ persister }}
        >
            <JotaiProvider>
                <HydrateAtoms>
                    <React.StrictMode>
                        <StartClient router={router} />
                    </React.StrictMode>
                </HydrateAtoms>
            </JotaiProvider>
        </PersistQueryClientProvider>
    </ErrorBoundary>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)