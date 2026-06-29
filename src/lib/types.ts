export type Niche = "writing" | "photography" | "music" | "art" | "design";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  portfolio_links: string[] | null;
  creative_interests: string[] | null;
  profile_completed?: boolean;
  created_at: string;
  updated_at: string;
}

export interface NicheCategory {
  id: string;
  niche: Niche;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface Piece {
  id: string;
  user_id: string;
  niche: Niche;
  category: string | null;
  title: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  tags: string[] | null;
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface PieceWithAuthor extends Piece {
  author: Profile;
}

export interface PieceLike {
  id: string;
  user_id: string;
  piece_id: string;
  created_at: string;
}

export interface PieceComment {
  id: string;
  user_id: string;
  piece_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface PieceCommentWithAuthor extends PieceComment {
  author: Profile;
}

export interface PieceDetail extends PieceWithAuthor {
  likes_count: number;
  comments_count: number;
  is_liked_by_user?: boolean;
}
