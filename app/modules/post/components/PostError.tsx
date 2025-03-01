import React from "react"
import { useQueryErrorResetBoundary } from "@tanstack/react-query"
import { type ErrorComponentProps, useRouter, ErrorComponent } from "@tanstack/react-router"
import { PostNotFoundError } from "app/modules/post/types"

export function PostErrorView({ error }: ErrorComponentProps) {
    const router = useRouter()
    if (error instanceof PostNotFoundError) {
        return <div>{error.message}</div>
    }
    const queryErrorResetBoundary = useQueryErrorResetBoundary()

    React.useEffect(() => {
        queryErrorResetBoundary.reset()
    }, [queryErrorResetBoundary])

    return (
        <div>
            <button
                onClick={() => {
                    router.invalidate()
                }}
            >
                retry
            </button>
            <ErrorComponent error={error} />
        </div>
    )
}