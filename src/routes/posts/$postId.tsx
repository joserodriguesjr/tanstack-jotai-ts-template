import {
  createFileRoute,
} from '@tanstack/react-router'
import { PostErrorView, PostView } from '@/modules/post/views'

export const Route = createFileRoute('/posts/$postId')({
  // loader: ({ context: { queryClient }, params: { postId } }) => {
  //   return queryClient.ensureQueryData(postQueryOptions(postId))
  // },
  errorComponent: PostErrorView,
  component: PostView,
})