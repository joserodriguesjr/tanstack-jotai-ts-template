import { useSuspenseQuery } from "@tanstack/react-query"
import { Link, Outlet, useParams } from "@tanstack/react-router"
import { postQueryOptions } from "@/modules/post/api"
import { Button } from "@/components/ui/button"

export function PostView() {
    const { postId } = useParams({ from: '/posts/$postId' })
    const { data: post } = useSuspenseQuery(postQueryOptions(postId))

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
                        params={{ postId }}
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