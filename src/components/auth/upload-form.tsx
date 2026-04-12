"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setMessage("");

    const supabase = createClient;
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error } = await supabase.storage
      .from("images") // You'll need to create this bucket
      .upload(filePath, file);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("File uploaded successfully!");
    }
    setUploading(false);
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <div>
        <label htmlFor="file" className="block text-sm font-medium">
          Select file
        </label>
        <input
          id="file"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-1 block w-full"
        />
      </div>
      <Button type="submit" disabled={uploading || !file}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
      {message && <p className="text-sm text-blue-600">{message}</p>}
    </form>
  );
}
