/// <reference types="vinxi/types/client" />
import React from 'react';
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start'
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from 'jotai'
import { useHydrateAtoms } from 'jotai/react/utils'
import { queryClientAtom } from 'jotai-tanstack-query';
import { createRouter, queryClient } from './router'
import reportWebVitals from './reportWebVitals';

const router = createRouter()

const HydrateAtoms = ({ children }: { children: React.ReactNode }) => {
    useHydrateAtoms([[queryClientAtom, queryClient]])
    return children
}

hydrateRoot(document,
    <QueryClientProvider client={queryClient}>
        <JotaiProvider>
            <React.StrictMode>
                <HydrateAtoms>
                    <StartClient router={router} />
                </HydrateAtoms>
            </React.StrictMode>
        </JotaiProvider>
    </QueryClientProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)