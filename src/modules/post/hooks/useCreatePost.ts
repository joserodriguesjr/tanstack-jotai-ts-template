// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createPost } from "@/modules/post/api/posts";

// export const useCreatePost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createPost,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["posts"]); // Refetch posts after creating
//     },
//   });
// };

// usage
// const { mutate: createPost, isPending } = useCreatePost();

// createPost({ title: "New Post", content: "Some content" });
