-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create exhibits table
CREATE TABLE IF NOT EXISTS public.exhibits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  images TEXT[], -- Array of image URLs from storage
  category TEXT,
  tags TEXT[],
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exhibits ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Public exhibits are viewable by everyone" ON public.exhibits
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view their own exhibits" ON public.exhibits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own exhibits" ON public.exhibits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own exhibits" ON public.exhibits
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own exhibits" ON public.exhibits
  FOR DELETE USING (auth.uid() = user_id);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Users can upload their own images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own images" ON storage.objects
  FOR DELETE USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage bucket for pieces (user-generated content)
INSERT INTO storage.buckets (id, name, public)
VALUES ('pieces', 'pieces', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for pieces
CREATE POLICY "Pieces are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'pieces');

CREATE POLICY "Users can upload pieces" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'pieces' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own pieces" ON storage.objects
  FOR UPDATE USING (bucket_id = 'pieces' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own pieces" ON storage.objects
  FOR DELETE USING (bucket_id = 'pieces' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create follows table
CREATE TABLE IF NOT EXISTS public.follows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Create likes table
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  exhibit_id UUID REFERENCES public.exhibits(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, exhibit_id)
);

-- Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  exhibit_id UUID REFERENCES public.exhibits(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  triggered_by_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL, -- 'like', 'comment', 'follow', 'exhibit'
  exhibit_id UUID REFERENCES public.exhibits(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on new tables
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for follows
CREATE POLICY "Follows are viewable by everyone" ON public.follows
  FOR SELECT USING (true);

CREATE POLICY "Users can follow other users" ON public.follows
  FOR INSERT WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow" ON public.follows
  FOR DELETE USING (auth.uid() = follower_id);

-- RLS Policies for likes
CREATE POLICY "Likes are viewable by everyone" ON public.likes
  FOR SELECT USING (true);

CREATE POLICY "Users can like exhibits" ON public.likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike exhibits" ON public.likes
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for comments
CREATE POLICY "Comments on public exhibits are viewable" ON public.comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.exhibits 
      WHERE exhibits.id = comments.exhibit_id AND exhibits.is_public = true
    )
  );

CREATE POLICY "Users can view comments on their exhibits" ON public.comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.exhibits 
      WHERE exhibits.id = comments.exhibit_id AND exhibits.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create comments" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON public.comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" ON public.comments
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications" ON public.notifications
  FOR DELETE USING (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- NICHE PIECES SYSTEM (Writing, Photography, Art, Design)
-- ============================================================

-- Niche categories lookup table
CREATE TABLE IF NOT EXISTS public.niche_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  niche TEXT NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(niche, slug)
);

-- Pieces table (all niche content)
CREATE TABLE IF NOT EXISTS public.pieces (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  niche TEXT NOT NULL,
  category TEXT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  tags TEXT[],
  is_published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Piece likes table
CREATE TABLE IF NOT EXISTS public.piece_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  piece_id UUID REFERENCES public.pieces(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, piece_id)
);

-- Piece comments table
CREATE TABLE IF NOT EXISTS public.piece_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  piece_id UUID REFERENCES public.pieces(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on niche tables
ALTER TABLE public.niche_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pieces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.piece_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.piece_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for niche_categories
CREATE POLICY "Categories are viewable by everyone" ON public.niche_categories
  FOR SELECT USING (true);

-- RLS Policies for pieces
CREATE POLICY "Published pieces are viewable by everyone" ON public.pieces
  FOR SELECT USING (is_published = true);

CREATE POLICY "Users can view their own pieces" ON public.pieces
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create pieces" ON public.pieces
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pieces" ON public.pieces
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pieces" ON public.pieces
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for piece_likes
CREATE POLICY "Piece likes are viewable by everyone" ON public.piece_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can like pieces" ON public.piece_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike pieces" ON public.piece_likes
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for piece_comments
CREATE POLICY "Comments on published pieces are viewable" ON public.piece_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.pieces 
      WHERE pieces.id = piece_comments.piece_id AND pieces.is_published = true
    )
  );

CREATE POLICY "Users can view comments on their pieces" ON public.piece_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.pieces 
      WHERE pieces.id = piece_comments.piece_id AND pieces.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create piece comments" ON public.piece_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own piece comments" ON public.piece_comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own piece comments" ON public.piece_comments
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_pieces_niche ON public.pieces(niche);
CREATE INDEX idx_pieces_user_id ON public.pieces(user_id);
CREATE INDEX idx_pieces_is_published ON public.pieces(is_published);
CREATE INDEX idx_pieces_created_at ON public.pieces(created_at DESC);
CREATE INDEX idx_piece_likes_piece_id ON public.piece_likes(piece_id);
CREATE INDEX idx_piece_comments_piece_id ON public.piece_comments(piece_id);
CREATE INDEX idx_niche_categories_niche ON public.niche_categories(niche);