import axios from 'redaxios'
import { PostNotFoundError, type Post } from '@/modules/post/types'

export const fetchPost = async (postId: string) => {
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

export const fetchPosts = async () => {
    console.info('Fetching posts...')
    await new Promise((r) => setTimeout(r, 500))
    return axios
        .get<Array<Post>>('https://jsonplaceholder.typicode.com/posts?_limit=11')
        .then((r) => r.data.slice(0, 10))
}
