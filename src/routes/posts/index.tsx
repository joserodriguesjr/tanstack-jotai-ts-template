import { createFileRoute } from '@tanstack/react-router'
import { PostsIndexView } from '@/modules/post/views'

export const Route = createFileRoute('/posts/')({
  component: PostsIndexView,
})


