import {
  createFileRoute,
} from '@tanstack/react-router'
import { PostErrorView, PostView } from '@/modules/post/views'
import { postQueryOptions } from '@/modules/post/api'

export const Route = createFileRoute('/posts/$postId')({
  loader: ({ context: { queryClient }, params: { postId } }) => {
    return queryClient.ensureQueryData(postQueryOptions(postId))
  },
  errorComponent: PostErrorView,
  component: PostView,
})