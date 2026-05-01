import { getServerClient } from "@/lib/supabase";
import { Piece, Niche } from "@/lib/types";

/**
 * Create a new piece (server action)
 */
export async function createPiece(
  data: Omit<Piece, "id" | "created_at" | "updated_at" | "view_count">,
) {
  const supabase = await getServerClient();

  const { data: piece, error } = await supabase
    .from("pieces")
    .insert({
      ...data,
      user_id: (await supabase.auth.getUser()).data.user?.id,
    })
    .select()
    .single();

  if (error) throw error;
  return piece;
}

/**
 * Update a piece (server action)
 */
export async function updatePiece(pieceId: string, updates: Partial<Piece>) {
  const supabase = await getServerClient();

  const { data: piece, error } = await supabase
    .from("pieces")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", pieceId)
    .select()
    .single();

  if (error) throw error;
  return piece;
}

/**
 * Delete a piece (server action)
 */
export async function deletePiece(pieceId: string) {
  const supabase = await getServerClient();

  const { error } = await supabase.from("pieces").delete().eq("id", pieceId);

  if (error) throw error;
}

/**
 * Publish a piece (server action)
 */
export async function publishPiece(pieceId: string) {
  return updatePiece(pieceId, { is_published: true });
}

/**
 * Unpublish a piece (server action)
 */
export async function unpublishPiece(pieceId: string) {
  return updatePiece(pieceId, { is_published: false });
}

/**
 * Increment piece view count (can be called server-side)
 */
export async function incrementPieceViews(pieceId: string) {
  const supabase = await getServerClient();

  const { data, error } = await supabase
    .from("pieces")
    .update({
      view_count:
        (
          await supabase
            .from("pieces")
            .select("view_count")
            .eq("id", pieceId)
            .single()
        ).data?.view_count + 1 || 1,
    })
    .eq("id", pieceId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get trending pieces for a niche
 */
export async function getTrendingPieces(niche: Niche, limit = 10) {
  const supabase = await getServerClient();

  const { data, error } = await supabase
    .from("pieces")
    .select(
      `
      *,
      author:profiles(*),
      _count:piece_likes(count)
    `,
    )
    .eq("niche", niche)
    .eq("is_published", true)
    .order("view_count", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

/**
 * Get featured pieces (most liked)
 */
export async function getFeaturedPieces(niche: Niche, limit = 5) {
  const supabase = await getServerClient();

  // This is a simplified query - in production you might want to aggregate likes first
  const { data, error } = await supabase
    .from("pieces")
    .select(
      `
      *,
      author:profiles(*),
      likes_count:piece_likes(count)
    `,
    )
    .eq("niche", niche)
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
