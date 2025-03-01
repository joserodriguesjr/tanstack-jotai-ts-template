// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deletePost } from "@/modules/post/api/posts";

// export const useDeletePost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deletePost,
//     onSuccess: (_, id) => {
//       queryClient.invalidateQueries(["posts"]); // Refetch posts after deletion
//     },
//   });
// };

// usage
// const { mutate: deletePost } = useDeletePost();
// deletePost("123");
