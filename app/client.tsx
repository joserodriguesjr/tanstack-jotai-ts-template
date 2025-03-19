/// <reference types="vinxi/types/client" />
import { StartClient } from '@tanstack/react-start';
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '@/components/error-fallback';
import reportWebVitals from '@/report-web-vitals';
import { createRouter } from '@/router';
import '@/lib/i18n';

const router = createRouter();

hydrateRoot(
  document,
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <React.StrictMode>
      <StartClient router={router} />
    </React.StrictMode>
  </ErrorBoundary>,
);

// window.addEventListener('vite:preloadError', (event) => {
//     window.location.reload() // for example, refresh the page
// })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
