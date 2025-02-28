import { createFileRoute } from '@tanstack/react-router'
import { postsQueryOptions } from '@/modules/post/api'
import { PostsLayoutView } from '@/modules/post/views'

export const Route = createFileRoute('/posts')({
    loader: ({ context: { queryClient } }) =>
        queryClient.ensureQueryData(postsQueryOptions),
    component: PostsLayoutView,
})


