// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { updatePost } from "@/modules/post/api/posts";

// export const useEditPost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: updatePost,
//     onSuccess: (_, { id }) => {
//       queryClient.invalidateQueries(["post", id]); // Refetch updated post
//     },
//   });
// };

// usage
// const { mutate: editPost } = useEditPost();
// editPost({ id: "123", title: "Updated title" });
