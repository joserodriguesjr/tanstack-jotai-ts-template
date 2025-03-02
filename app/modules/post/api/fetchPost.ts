import axios from 'redaxios'
import { queryOptions } from '@tanstack/react-query'
import {atom} from "jotai";
import { PostNotFoundError, type Post } from 'app/modules/post/types'
import { atomWithSuspenseQuery } from 'jotai-tanstack-query'

const fetchPost = async (postId: string) => {
    console.info(`Fetching post with id ${postId}...`)
    await new Promise((r) => setTimeout(r, 500))
    const post = await axios
        .get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((r) => r.data)
        .catch((err) => {
            if (err.status === 404) {
                throw new PostNotFoundError(`Post with id "${postId}" not found!`)
            }
            throw err
        })

    return post
}

export const postQueryOptions = (postId: string) =>
    queryOptions({
        queryKey: ['post', postId],
        queryFn: () => fetchPost(postId),
})

export const postIdAtom = atom<string>("1");
export const postAtom = atomWithSuspenseQuery((get) => postQueryOptions(String(get(postIdAtom))))
