"use client";

interface UploadProgressProps {
  status: "uploading" | "success" | "error";
  progress: number;
  error: string | null;
}

export function UploadProgress({
  status,
  progress,
  error,
}: UploadProgressProps) {
  return (
    <div className="space-y-4">
      {status === "uploading" && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Uploading...</h3>
            <span className="text-2xl font-bold text-blue-600">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}

      {status === "success" && (
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <svg
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-green-800">
              Upload successful!
            </h3>
            <p className="text-sm text-green-600">
              Redirecting to your new piece...
            </p>
          </div>
        </div>
      )}

      {status === "error" && error && (
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <svg
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-red-800">Upload failed</h3>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
