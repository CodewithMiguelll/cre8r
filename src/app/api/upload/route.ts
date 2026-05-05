import { NextRequest, NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const supabase = await getServerClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const niche = formData.get("niche") as string;
    const category = formData.get("category") as string;
    const tags = JSON.parse((formData.get("tags") as string) || "[]");
    const isPublished = formData.get("isPublished") === "true";

    // Validate inputs
    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 },
      );
    }

    if (!title || !description || !niche) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);

    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const ext = file.name.split(".").pop() || "bin";
    const fileName = `${user.id}/${timestamp}-${random}.${ext}`;

    // Upload file to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from("pieces")
      .upload(fileName, uint8Array, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json(
        { message: "Failed to upload file" },
        { status: 500 },
      );
    }

    // Get public URL for the uploaded file
    const {
      data: { publicUrl },
    } = supabase.storage.from("pieces").getPublicUrl(fileName);

    // Create piece record in database
    const { data: piece, error: dbError } = await supabase
      .from("pieces")
      .insert({
        user_id: user.id,
        title,
        content: description, // Using description as content for now
        excerpt: description.substring(0, 150),
        cover_image: publicUrl,
        niche,
        category: category || null,
        tags: tags && tags.length > 0 ? tags : null,
        is_published: isPublished,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      // Try to clean up uploaded file if DB insert fails
      await supabase.storage.from("pieces").remove([fileName]);
      return NextResponse.json(
        { message: "Failed to save piece metadata" },
        { status: 500 },
      );
    }

    return NextResponse.json({ pieceId: piece.id }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
