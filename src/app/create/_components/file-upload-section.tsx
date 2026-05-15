"use client";

import { useCallback, useState } from "react";

interface FileUploadSectionProps {
  onFilesSelect: (files: File[]) => void;
  files: File[];
  uploadMode: "single" | "batch";
  onUploadModeChange: (mode: "single" | "batch") => void;
  disabled: boolean;
}

export function FileUploadSection({
  onFilesSelect,
  files,
  uploadMode,
  onUploadModeChange,
  disabled,
}: FileUploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);

  const ACCEPTED_FILE_TYPES = {
    "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"],
    "video/*": [".mp4", ".webm", ".mov", ".avi"],
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
  };

  const accept = Object.keys(ACCEPTED_FILE_TYPES).join(",");

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      const validatedFiles =
        uploadMode === "single" ? [droppedFiles[0]] : droppedFiles;
      onFilesSelect(validatedFiles.filter(Boolean));
    },
    [uploadMode, onFilesSelect],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      const validatedFiles =
        uploadMode === "single" ? [selectedFiles[0]] : selectedFiles;
      onFilesSelect(validatedFiles.filter(Boolean));
    },
    [uploadMode, onFilesSelect],
  );

  const removeFile = (index: number) => {
    onFilesSelect(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Upload Mode Selector */}
      <div className="flex gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={uploadMode === "single"}
            onChange={() => onUploadModeChange("single")}
            disabled={disabled}
            className="w-4 h-4"
          />
          <span className="text-gray-700">Upload Single File</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={uploadMode === "batch"}
            onChange={() => onUploadModeChange("batch")}
            disabled={disabled}
            className="w-4 h-4"
          />
          <span className="text-gray-700">Upload Multiple Files</span>
        </label>
      </div>

      {/* Drag and Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? "border-black bg-gray-50"
            : "border-gray-300 bg-gray-50"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-400"}`}
      >
        <input
          type="file"
          id="file-input"
          onChange={handleFileInput}
          accept={accept}
          multiple={uploadMode === "batch"}
          disabled={disabled}
          className="hidden"
        />

        <label htmlFor="file-input" className="cursor-pointer block">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-6-12l-6-6m0 0l-6 6m6-6v14"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-900">
            Drag and drop your files here
          </p>
          <p className="text-sm text-gray-600 mt-1">
            or click to browse from your computer
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Supported formats: Images (JPG, PNG, GIF), Videos (MP4, WebM),
            Documents (PDF, DOC, DOCX)
          </p>
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Selected Files ({files.length})
          </h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileIcon type={file.type} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                  className="ml-3 p-1 text-gray-400 hover:text-red-500 disabled:opacity-50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function FileIcon({ type }: { type: string }) {
  if (type.startsWith("image/")) {
    return (
      <svg
        className="w-6 h-6 text-blue-500 shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
      </svg>
    );
  }
  if (type.startsWith("video/")) {
    return (
      <svg
        className="w-6 h-6 text-purple-500 shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm13.707-1.707a1 1 0 00-1.414 1.414L12.586 10l-1.293 1.293a1 1 0 001.414 1.414L14 11.414l1.293 1.293a1 1 0 001.414-1.414L15.414 10l1.293-1.293a1 1 0 00-1.414-1.414L14 8.586l-1.293-1.293z" />
      </svg>
    );
  }
  return (
    <svg
      className="w-6 h-6 text-gray-500 shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
    </svg>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
