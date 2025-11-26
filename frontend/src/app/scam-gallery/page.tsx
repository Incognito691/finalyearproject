"use client";
import { useEffect, useState } from "react";

interface ScamImage {
  name: string;
  url: string;
  path: string;
  created_at?: string;
  size: number;
}

export default function ScamGalleryPage() {
  const [images, setImages] = useState<ScamImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      const resp = await fetch(`${baseUrl}/scam-gallery`);

      if (!resp.ok) {
        throw new Error("Failed to load scam gallery");
      }

      const data = await resp.json();
      setImages(data);
    } catch (err: any) {
      setError(err.message || "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateStr?: string) {
    if (!dateStr) return "Unknown";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Unknown";
    }
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        {/* Header */}
        <div className="glass p-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Scam Screenshots Gallery
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of high-risk scam screenshots (80%+ probability)
            submitted by our community. These images have been analyzed and
            flagged as potential fraud attempts to help warn others.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm pt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-gray-400">High Risk (80-100%)</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-purple-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-400">{images.length} Screenshots</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-gray-400">Loading scam screenshots...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="glass p-8 text-center space-y-4">
            <svg
              className="w-12 h-12 text-red-400 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-400">{error}</p>
            <p className="text-sm text-gray-500">
              Make sure Supabase storage is configured and the backend is
              running.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && images.length === 0 && (
          <div className="glass p-12 text-center space-y-4">
            <svg
              className="w-16 h-16 text-gray-600 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xl font-semibold text-gray-400">
              No scam screenshots yet
            </p>
            <p className="text-gray-500">
              High-risk screenshots (80%+ probability) will appear here once
              submitted.
            </p>
            <a
              href="/"
              className="inline-block mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all"
            >
              Upload a Screenshot
            </a>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="glass overflow-hidden group hover:scale-105 transition-transform duration-300"
              >
                {/* Image */}
                <div className="relative aspect-video bg-gray-900/50 overflow-hidden">
                  <img
                    src={img.url}
                    alt={`Scam screenshot ${idx + 1}`}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* High Risk Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-sm flex items-center gap-1.5 text-xs font-semibold">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    HIGH RISK
                  </div>
                </div>

                {/* Metadata */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(img.created_at)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      {formatSize(img.size)}
                    </div>
                  </div>

                  {/* View Full Image Button */}
                  <a
                    href={img.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 rounded-lg text-center text-sm font-medium bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
                  >
                    View Full Image
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Warning Notice */}
        {!loading && images.length > 0 && (
          <div className="glass p-6 flex items-start gap-4">
            <svg
              className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-yellow-400">
                Important Notice
              </h3>
              <p className="text-sm text-gray-400">
                These screenshots are provided for educational purposes to help
                identify scam patterns. Do not attempt to contact or engage with
                any numbers or services shown in these images. Always verify
                suspicious messages through official channels.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
