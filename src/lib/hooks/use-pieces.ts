import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase";
import { Piece, PieceWithAuthor, Niche } from "@/lib/types";

export function usePieces(niche: Niche, category?: string) {
  return useQuery({
    queryKey: ["pieces", niche, category],
    queryFn: async () => {
      const supabase = createClient();

      let query = supabase
        .from("pieces")
        .select(
          `
          *,
          author:profiles(*)
        `,
        )
        .eq("niche", niche)
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (category) {
        query = query.eq("category", category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    },
  });
}

export function usePiecesByUser(userId: string) {
  return useQuery({
    queryKey: ["pieces", "user", userId],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("pieces")
        .select(
          `
          *,
          author:profiles(*)
        `,
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!userId,
  });
}

export async function fetchPieceDetail(pieceId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("pieces")
    .select(
      `
      *,
      author:profiles(*),
      likes_count:piece_likes(count),
      comments_count:piece_comments(count)
    `,
    )
    .eq("id", pieceId)
    .single();

  if (error) throw error;
  return data;
}

export async function incrementViewCount(pieceId: string) {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("increment_piece_views", {
    piece_id: pieceId,
  });

  if (error) throw error;
  return data;
}
