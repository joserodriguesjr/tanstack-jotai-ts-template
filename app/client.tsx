/// <reference types="vinxi/types/client" />
import React from 'react';
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start'
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from 'jotai'
import { useHydrateAtoms } from 'jotai/react/utils'
import { queryClientAtom } from 'jotai-tanstack-query';
import { createRouter, queryClient } from './router'

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