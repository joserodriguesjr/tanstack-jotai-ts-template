import { Suspense } from "react"
import { useAtomValue } from 'jotai'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { Button } from "app/components/ui/Button"
import Loading from "app/components/Loading"
import { postQueryOptions } from 'app/modules/post/api'
import { PostErrorView } from "app/modules/post/components/PostError"
import { postAtom } from "app/modules/post/atoms"

export const Route = createFileRoute('/posts/$postId')({
  loader: ({ context: { queryClient }, params: { postId } }) => {
    return queryClient.ensureQueryData(postQueryOptions(postId))
  },
  errorComponent: PostErrorView,
  component: PostView,
})

function PostViewContent() {
  const { data: post } = useAtomValue(postAtom)
  console.log("post - ", post)

  return (
    <>
      <div className="">
        <div className="space-y-2">
          <h4 className="text-xl font-bold">{post.title}</h4>
          <div className="text-sm">{post.body}</div>
        </div>
        <Button className="pt-4 pb-2" variant={"link"} size={"icon"}>
          <Link
            to="/posts/$postId/edit"
            params={{ postId: post.id }}
            className="[&.active]:text-green-500"
          >
            Edit
          </Link>
        </Button>
        <hr />
        <Outlet />
      </div>
    </>
  )
}

function PostView() {
  return (
    <Suspense fallback={<Loading />}>
      <PostViewContent />
    </Suspense>
  )
}