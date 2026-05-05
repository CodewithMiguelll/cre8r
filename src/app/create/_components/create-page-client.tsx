"use client";

import { useState } from "react";
import { Niche } from "@/lib/types";
import { FileUploadSection } from "./file-upload-section";
import { MetadataForm } from "./metadata-form";
import { UploadProgress } from "./upload-progress";

interface CreateFormData {
  files: File[];
  title: string;
  description: string;
  niche: Niche;
  category?: string;
  tags: string[];
  isPublished: boolean;
  uploadMode: "single" | "batch";
}

export function CreatePageClient() {
  const [formData, setFormData] = useState<CreateFormData>({
    files: [],
    title: "",
    description: "",
    niche: "writing",
    category: "",
    tags: [],
    isPublished: false,
    uploadMode: "single",
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFilesSelect = (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      files,
    }));
  };

  const handleFormDataChange = (
    updates: Partial<Omit<CreateFormData, "files">>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.files.length) {
      setUploadError("Please select at least one file to upload");
      return;
    }

    if (!formData.title.trim()) {
      setUploadError("Please enter a title");
      return;
    }

    if (!formData.description.trim()) {
      setUploadError("Please enter a description");
      return;
    }

    try {
      setUploading(true);
      setUploadStatus("uploading");
      setUploadError(null);
      setUploadProgress(0);

      // Calculate progress increment per file
      const progressPerFile = 100 / formData.files.length;
      let currentProgress = 0;

      // Upload files and create pieces
      const uploadedPieceIds: string[] = [];

      for (let i = 0; i < formData.files.length; i++) {
        const file = formData.files[i];

        // Upload file to Supabase storage
        const pieceId = await uploadFile(file, formData);

        uploadedPieceIds.push(pieceId);
        currentProgress += progressPerFile;
        setUploadProgress(Math.min(currentProgress, 95));
      }

      setUploadProgress(100);
      setUploadStatus("success");

      // Redirect to the first piece or dashboard after short delay
      setTimeout(() => {
        if (uploadedPieceIds.length === 1) {
          window.location.href = `/pieces/${uploadedPieceIds[0]}`;
        } else {
          window.location.href = `/profile`;
        }
      }, 1500);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      setUploadError(
        error instanceof Error
          ? error.message
          : "Upload failed. Please try again.",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create New Piece
          </h1>
          <p className="text-lg text-gray-600">
            Share your creative work with the community
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* File Upload Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <FileUploadSection
              onFilesSelect={handleFilesSelect}
              files={formData.files}
              uploadMode={formData.uploadMode}
              onUploadModeChange={(mode) =>
                handleFormDataChange({ uploadMode: mode })
              }
              disabled={uploading}
            />
          </div>

          {/* Metadata Form Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <MetadataForm
              formData={formData}
              onChange={handleFormDataChange}
              disabled={uploading}
            />
          </div>

          {/* Upload Progress */}
          {uploadStatus !== "idle" && (
            <div className="bg-white rounded-lg shadow-md p-8">
              <UploadProgress
                status={uploadStatus}
                progress={uploadProgress}
                error={uploadError}
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              disabled={uploading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || !formData.files.length || !formData.title}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {uploading ? "Uploading..." : "Create & Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

async function uploadFile(
  file: File,
  formData: CreateFormData,
): Promise<string> {
  const formDataToSend = new FormData();
  formDataToSend.append("file", file);
  formDataToSend.append("title", formData.title);
  formDataToSend.append("description", formData.description);
  formDataToSend.append("niche", formData.niche);
  formDataToSend.append("category", formData.category || "");
  formDataToSend.append("tags", JSON.stringify(formData.tags));
  formDataToSend.append("isPublished", String(formData.isPublished));

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formDataToSend,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Upload failed");
  }

  const data = await response.json();
  return data.pieceId;
}
