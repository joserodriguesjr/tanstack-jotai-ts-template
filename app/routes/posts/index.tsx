import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/')({
  component: PostsIndexView,
})

function PostsIndexView() {
  return <div>Select a post.</div>
}

