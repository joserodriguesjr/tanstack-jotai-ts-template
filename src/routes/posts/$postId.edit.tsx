import { createFileRoute } from '@tanstack/react-router'
import { PostEditView } from '@/modules/post/views'

export const Route = createFileRoute('/posts/$postId/edit')({
  component: PostEditView,
})
