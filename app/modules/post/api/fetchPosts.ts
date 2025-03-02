import axios from 'redaxios'
import { queryOptions } from '@tanstack/react-query'
import { atomWithSuspenseQuery } from 'jotai-tanstack-query'

import type {Post} from 'app/modules/post/types'

export const fetchPosts = async () => {
    console.info('Fetching posts...')
    await new Promise((r) => setTimeout(r, 500))
    return axios
        .get<Array<Post>>('https://jsonplaceholder.typicode.com/posts?_limit=11')
        .then((r) => r.data.slice(0, 10))
}

export const postsQueryOptions = queryOptions({
    queryKey: ['posts'],
    queryFn: fetchPosts,
})

export const postsAtom = atomWithSuspenseQuery(() => postsQueryOptions)