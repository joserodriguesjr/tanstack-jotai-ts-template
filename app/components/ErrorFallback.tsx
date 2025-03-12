import { useEffect } from "react";

interface ErrorFallbackProps {
    error: { message?: string } | null;
}

export function ErrorFallback({ error }: ErrorFallbackProps) {
    // Handle failed lazy loading of a JS/CSS chunk.
    useEffect(() => {
        const chunkFailedMessage = /Loading chunk [\d]+ failed/;
        if (error?.message && chunkFailedMessage.test(error.message)) {
            if (!getWithExpiry("chunk_failed")) {
                setWithExpiry("chunk_failed", "true", 10000);
                window.location.reload();
            }
        }
    }, [error]);

    return (
        <div>
            <p>Something went wrong.</p>
            <pre>{error?.message}</pre>
        </div>
    );
}
function setWithExpiry(key: string, value: string, ttl: number): void {
    const item = {
        value,
        expiry: new Date().getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key: string): string | null {
    const itemString = window.localStorage.getItem(key);
    if (!itemString) return null;

    try {
        const item: { value: string; expiry: number } = JSON.parse(itemString);
        if (new Date().getTime() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    } catch {
        return null;
    }
}