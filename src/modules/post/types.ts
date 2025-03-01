export type Post = {
    id: string
    title: string
    body: string
}

export class PostNotFoundError extends Error { }
