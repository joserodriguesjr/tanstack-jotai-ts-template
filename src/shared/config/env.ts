export const ENV = {
  SERVER_URL: import.meta.env.VITE_SERVER_URL || 'https://localhost:3000',
  WS_URL: import.meta.env.VITE_WS_URL || 'wss://localhost:3000/_ws',
  NODE_ENV: import.meta.env.VITE_NODE_ENV || 'development',
  DEBUG: import.meta.env.VITE_DEBUG === 'true',
} as const;
