import { Suspense } from 'react'
import { useSetAtom, useAtomValue } from 'jotai'
import { createFileRoute } from '@tanstack/react-router'
import { Link, Outlet } from '@tanstack/react-router'
import { postIdAtom, postsAtom, postsQueryOptions } from 'app/modules/post/api'
import Loading from 'app/components/Loading'

export const Route = createFileRoute('/posts')({
    loader: ({ context: { queryClient } }) => queryClient.prefetchQuery(postsQueryOptions),
    component: PostsView,
})

function PostsViewContent() {
    const { data: posts } = useAtomValue(postsAtom)
    const setPostId = useSetAtom(postIdAtom)

    return (
        <div className="p-2 flex gap-2">
            <ul className="list-disc pl-4">
                {[...posts, { id: 'i-do-not-exist', title: 'Non-existent Post' }].map(
                    (post) => {
                        return (
                            <li key={post.id} className="whitespace-nowrap">
                                <Link
                                    to="/posts/$postId"
                                    params={{ postId: post.id }}
                                    className="[&.active]:font-bold [&.active]:underline block py-1 text-blue-600 hover:opacity-75"
                                    onClick={() => setPostId(post.id)}
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

function PostsView() {
    return (
        <Suspense fallback={<Loading />}>
            <PostsViewContent />
        </Suspense>
    )
}