import { useQueryClient } from "@tanstack/react-query";
import { postQueryOptions } from "@/modules/post/api";

export function usePrefetchPost() {
    const queryClient = useQueryClient();
    return (postId: string) => queryClient.prefetchQuery(postQueryOptions(postId));
}