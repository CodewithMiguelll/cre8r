import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Piece, PieceWithAuthor, Niche } from "@/lib/types";

export function usePieces(niche: Niche, category?: string) {
  const [pieces, setPieces] = useState<PieceWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        setLoading(true);
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

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setPieces(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch pieces");
      } finally {
        setLoading(false);
      }
    };

    fetchPieces();
  }, [niche, category]);

  return { pieces, loading, error };
}

export function usePiecesByUser(userId: string) {
  const [pieces, setPieces] = useState<PieceWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        setLoading(true);
        const supabase = createClient();

        const { data, error: fetchError } = await supabase
          .from("pieces")
          .select(
            `
            *,
            author:profiles(*)
          `,
          )
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;
        setPieces(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch pieces");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPieces();
    }
  }, [userId]);

  return { pieces, loading, error };
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
