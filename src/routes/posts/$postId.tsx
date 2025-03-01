import { Suspense } from "react"
import { useAtomValue } from 'jotai'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/Button"
import Loading from "@/components/Loading"
import { postQueryOptions } from '@/modules/post/api'
import { PostErrorView } from "@/modules/post/components/PostError"
import { postAtom } from "@/modules/post/atoms"

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