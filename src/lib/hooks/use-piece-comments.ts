import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase";
import { PieceCommentWithAuthor } from "@/lib/types";

export function usePieceComments(pieceId: string) {
  const queryClient = useQueryClient();
  const supabase = createClient();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["piece_comments", pieceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("piece_comments")
        .select(
          `
          *,
          author:profiles(*)
        `,
        )
        .eq("piece_id", pieceId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async ({
      userId,
      content,
    }: {
      userId: string;
      content: string;
    }) => {
      const { data, error } = await supabase
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

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["piece_comments", pieceId],
      });
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: async ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => {
      const { data, error } = await supabase
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

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["piece_comments", pieceId],
      });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const { error } = await supabase
        .from("piece_comments")
        .delete()
        .eq("id", commentId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["piece_comments", pieceId],
      });
    },
  });

  return {
    comments,
    loading: isLoading,
    error:
      addCommentMutation.error ||
      updateCommentMutation.error ||
      deleteCommentMutation.error,
    addComment: (userId: string, content: string) =>
      addCommentMutation.mutate({ userId, content }),
    isAddingComment: addCommentMutation.isPending,
    updateComment: (commentId: string, content: string) =>
      updateCommentMutation.mutate({ commentId, content }),
    isUpdatingComment: updateCommentMutation.isPending,
    deleteComment: (commentId: string) =>
      deleteCommentMutation.mutate(commentId),
    isDeletingComment: deleteCommentMutation.isPending,
  };
}
