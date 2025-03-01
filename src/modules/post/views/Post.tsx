import { Link, Outlet } from "@tanstack/react-router"
import { Button } from "@/components/ui/Button"
import { Suspense } from "react"
import { useAtomValue } from "jotai"
import { postAtom } from "../atoms"
import Loading from "@/components/Loading"

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

export function PostView() {
    return (
        <Suspense fallback={<Loading />}>
            <PostViewContent />
        </Suspense>
    )
}