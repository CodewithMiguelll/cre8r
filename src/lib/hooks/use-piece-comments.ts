import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { PieceComment, PieceCommentWithAuthor } from "@/lib/types";

export function usePieceComments(pieceId: string) {
  const [comments, setComments] = useState<PieceCommentWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const supabase = createClient();

        const { data, error: fetchError } = await supabase
          .from("piece_comments")
          .select(
            `
            *,
            author:profiles(*)
          `,
          )
          .eq("piece_id", pieceId)
          .order("created_at", { ascending: true });

        if (fetchError) throw fetchError;
        setComments(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch comments",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [pieceId]);

  const addComment = useCallback(
    async (userId: string, content: string) => {
      try {
        const supabase = createClient();

        const { data, error: insertError } = await supabase
          .from("piece_comments")
          .insert({
            piece_id: pieceId,
            user_id: userId,
            content,
          })
          .select(
            `
            *,
            author:profiles(*)
          `,
          )
          .single();

        if (insertError) throw insertError;

        setComments((prev) => [...prev, data]);
        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add comment");
        throw err;
      }
    },
    [pieceId],
  );

  const updateComment = useCallback(
    async (commentId: string, content: string) => {
      try {
        const supabase = createClient();

        const { data, error: updateError } = await supabase
          .from("piece_comments")
          .update({ content, updated_at: new Date().toISOString() })
          .eq("id", commentId)
          .select(
            `
            *,
            author:profiles(*)
          `,
          )
          .single();

        if (updateError) throw updateError;

        setComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId ? { ...comment, ...data } : comment,
          ),
        );
        return data;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update comment",
        );
        throw err;
      }
    },
    [],
  );

  const deleteComment = useCallback(async (commentId: string) => {
    try {
      const supabase = createClient();

      const { error: deleteError } = await supabase
        .from("piece_comments")
        .delete()
        .eq("id", commentId);

      if (deleteError) throw deleteError;

      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete comment");
      throw err;
    }
  }, []);

  return {
    comments,
    loading,
    error,
    addComment,
    updateComment,
    deleteComment,
  };
}
