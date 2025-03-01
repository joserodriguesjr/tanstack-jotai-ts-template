export const ENV = {
    API_URL: process.env.REACT_APP_API_URL || "https://api.example.com",
    NODE_ENV: process.env.NODE_ENV || "development",
    DEBUG_MODE: process.env.REACT_APP_DEBUG === "true",
    FEATURE_TOGGLE: process.env.REACT_APP_FEATURE_TOGGLE === "true",
    AUTH_TOKEN: process.env.REACT_APP_AUTH_TOKEN || "",
  } as const;
  