import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { PieceLike } from "@/lib/types";

export function usePieceLikes(pieceId: string, userId?: string) {
  const [likes, setLikes] = useState<PieceLike[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        setLoading(true);
        const supabase = createClient();

        const { data, error: fetchError } = await supabase
          .from("piece_likes")
          .select("*")
          .eq("piece_id", pieceId);

        if (fetchError) throw fetchError;

        setLikes(data || []);
        setLikesCount(data?.length || 0);

        if (userId) {
          const userLike = data?.some((like) => like.user_id === userId);
          setIsLiked(!!userLike);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch likes");
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [pieceId, userId]);

  const toggleLike = useCallback(
    async (likeUserId: string) => {
      try {
        const supabase = createClient();

        if (isLiked) {
          // Unlike
          const { error: deleteError } = await supabase
            .from("piece_likes")
            .delete()
            .eq("piece_id", pieceId)
            .eq("user_id", likeUserId);

          if (deleteError) throw deleteError;
          setIsLiked(false);
          setLikesCount((prev) => Math.max(0, prev - 1));
        } else {
          // Like
          const { error: insertError } = await supabase
            .from("piece_likes")
            .insert({
              piece_id: pieceId,
              user_id: likeUserId,
            });

          if (insertError) throw insertError;
          setIsLiked(true);
          setLikesCount((prev) => prev + 1);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to toggle like");
      }
    },
    [pieceId, isLiked],
  );

  return { likes, isLiked, likesCount, loading, error, toggleLike };
}
