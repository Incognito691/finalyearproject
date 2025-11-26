"use client";
import { useState, type FormEvent, type ChangeEvent } from "react";
import clsx from "clsx";

interface AnalysisResult {
  extracted_text: string;
  scam_probability: number;
  risk_level: string;
  detected_keywords: string[];
  explanation: string;
  image_url?: string;
  storage_path?: string;
}

export default function ScreenshotAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File too large. Max 5MB.");
        return;
      }
      if (
        !["image/jpeg", "image/png", "image/webp"].includes(selectedFile.type)
      ) {
        setError("Only JPG, PNG, WEBP supported.");
        return;
      }
      setFile(selectedFile);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  }

  async function handleAnalyze(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) {
      setError("Please select an image.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      const resp = await fetch(`${baseUrl}/analyze-screenshot`, {
        method: "POST",
        body: formData,
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.detail || "Analysis failed");
      }

      const data = await resp.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to analyze screenshot");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  }

  return (
    <div className="glass p-4 sm:p-6 space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0"
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
          <h3 className="text-sm sm:text-lg font-semibold">
            <span className="hidden sm:inline">Screenshot Scam Analyzer</span>
            <span className="sm:hidden">Screenshot Analyzer</span>
          </h3>
        </div>
        <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 flex-shrink-0">
          AI-Powered<span className="hidden sm:inline"> OCR</span>
        </span>
      </div>

      <p className="text-xs sm:text-sm text-gray-400">
        Upload a screenshot of a suspicious{" "}
        <span className="hidden sm:inline">SMS, WhatsApp, or </span>message. Our
        AI will extract<span className="hidden sm:inline"> the text</span> and
        analyze it for scam patterns.
      </p>

      <form onSubmit={handleAnalyze} className="space-y-3 sm:space-y-4">
        <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 sm:p-6 text-center hover:border-purple-500/50 transition-colors">
          {!preview ? (
            <label className="cursor-pointer block">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-600 mb-2 sm:mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-gray-400 text-xs sm:text-sm">
                Click to upload
                <span className="hidden sm:inline"> or drag & drop</span>
              </p>
              <p className="text-gray-500 text-[10px] sm:text-xs mt-1">
                JPG, PNG, WEBP (max 5MB)
              </p>
            </label>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 sm:max-h-64 mx-auto rounded-lg border border-gray-700"
              />
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm bg-red-600/80 hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete<span className="hidden sm:inline"> Image</span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={clsx(
                    "px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 sm:gap-2 transition-all",
                    loading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                  )}
                >
                  {loading && <span className="spinner" />}
                  {loading
                    ? "Analyzing..."
                    : "<span className='hidden sm:inline'>Analyze </span><span className='sm:hidden'>Analyze </span>Screenshot"}
                </button>
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-400 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </form>

      {result && (
        <div className="space-y-3 sm:space-y-4 animate-slideUp">
          {/* New Analysis Button */}
          <div className="flex justify-end">
            <button
              onClick={handleClear}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium bg-gray-700 hover:bg-gray-600 transition-colors flex items-center gap-1.5 sm:gap-2"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Analysis
            </button>
          </div>

          {/* Risk Result */}
          <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-semibold text-xs sm:text-sm">
                Analysis Result
              </h4>
              <div
                className={clsx("text-lg sm:text-2xl font-bold", {
                  "text-green-400": result.risk_level === "LOW",
                  "text-yellow-400": result.risk_level === "MEDIUM",
                  "text-red-400": result.risk_level === "HIGH",
                })}
              >
                {result.risk_level} RISK
              </div>
            </div>

            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={clsx(
                  "h-full rounded-full transition-all duration-500",
                  {
                    "bg-gradient-to-r from-green-500 to-green-400":
                      result.risk_level === "LOW",
                    "bg-gradient-to-r from-yellow-500 to-orange-400":
                      result.risk_level === "MEDIUM",
                    "bg-gradient-to-r from-red-500 to-pink-500":
                      result.risk_level === "HIGH",
                  }
                )}
                style={{
                  width: `${Math.min(result.scam_probability * 100, 100)}%`,
                }}
              />
            </div>
            <p className="text-xs text-gray-400">
              Scam Probability: {(result.scam_probability * 100).toFixed(1)}%
            </p>
          </div>

          {/* Extracted Text */}
          {result.extracted_text && (
            <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 space-y-1.5 sm:space-y-2">
              <h4 className="font-semibold text-xs sm:text-sm">
                Extracted Text
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap font-mono bg-gray-900/50 p-2.5 sm:p-3 rounded border border-gray-700 max-h-28 sm:max-h-32 overflow-y-auto">
                {result.extracted_text}
              </p>
            </div>
          )}

          {/* Keywords */}
          {result.detected_keywords && result.detected_keywords.length > 0 && (
            <div className="bg-gray-800/50 rounded-lg p-3 sm:p-4 space-y-1.5 sm:space-y-2">
              <h4 className="font-semibold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 text-orange-400">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Scam Keywords<span className="hidden sm:inline"> Detected</span>
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {result.detected_keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-[10px] sm:text-xs"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Explanation */}
          {result.explanation && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-blue-200">
                {result.explanation}
              </p>
            </div>
          )}

          {/* High Risk Notice - Saved to Gallery */}
          {result.scam_probability >= 0.8 && result.image_url && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-semibold text-purple-300 mb-0.5 sm:mb-1">
                  Saved to Scam Gallery
                </p>
                <p className="text-[10px] sm:text-xs text-purple-400">
                  This high-risk screenshot has been saved to our community
                  gallery
                  <span className="hidden sm:inline"> to help warn others</span>
                  .
                  <a
                    href="/scam-gallery"
                    className="ml-1.5 sm:ml-2 underline hover:text-purple-300"
                  >
                    View <span className="hidden sm:inline">Gallery </span>→
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
