/// <reference types="vinxi/types/client" />
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start";
import { createRouter } from "./router";
import reportWebVitals from "./reportWebVitals";
import { ErrorFallback } from "./components/ErrorFallback";

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
