import { Link, Outlet } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { postsQueryOptions } from "@/modules/post/api"

export function PostsLayoutView() {
    const postsQuery = useSuspenseQuery(postsQueryOptions)
    const posts = postsQuery.data

    return (
        <div className="p-2 flex gap-2">
            <ul className="list-disc pl-4">
                {[...posts, { id: 'i-do-not-exist', title: 'Non-existent Post' }].map(
                    (post) => {
                        return (
                            <li key={post.id} className="whitespace-nowrap">
                                <Link
                                    to="/posts/$postId"
                                    params={{
                                        postId: post.id,
                                    }}
                                    className="[&.active]:font-bold [&.active]:underline block py-1 text-blue-600 hover:opacity-75"
                                >
                                    <div>{post.title.substring(0, 20)}</div>
                                </Link>
                            </li>
                        )
                    },
                )}
            </ul>
            <hr />
            <Outlet />
        </div>
    )
}