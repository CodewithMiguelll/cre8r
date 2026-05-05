import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase";
import { PieceLike } from "@/lib/types";

export function usePieceLikes(pieceId: string, userId?: string) {
  const queryClient = useQueryClient();
  const supabase = createClient();

  const { data: likes = [], isLoading } = useQuery({
    queryKey: ["piece_likes", pieceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("piece_likes")
        .select("*")
        .eq("piece_id", pieceId);

      if (error) throw error;
      return data || [];
    },
  });

  const isLiked = userId
    ? likes.some((like) => like.user_id === userId)
    : false;
  const likesCount = likes.length;

  const toggleLikeMutation = useMutation({
    mutationFn: async (likeUserId: string) => {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from("piece_likes")
          .delete()
          .eq("piece_id", pieceId)
          .eq("user_id", likeUserId);

        if (error) throw error;
      } else {
        // Like
        const { error } = await supabase.from("piece_likes").insert({
          piece_id: pieceId,
          user_id: likeUserId,
        });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["piece_likes", pieceId],
      });
    },
  });

  return {
    likes,
    isLiked,
    likesCount,
    loading: isLoading,
    error: toggleLikeMutation.error,
    toggleLike: toggleLikeMutation.mutate,
    isToggling: toggleLikeMutation.isPending,
  };
}
