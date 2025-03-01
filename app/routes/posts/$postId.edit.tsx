import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId/edit')({
  component: PostEditView,
})

function PostEditView() {
  return (
    <div>
      TODO: USE REACT QUERY + JOTAI + MUTATION &quot;/posts/$postId/edit&quot;!
    </div>
  )
}