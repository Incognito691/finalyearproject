"use client";
import { useState, type FormEvent } from "react";
import clsx from "clsx";
import { submitReport } from "../lib/api";

const CATEGORIES = [
  "eSewa/Khalti Wallet Scam",
  "OTP Theft Attempt",
  "Fake Job Offer",
  "Impersonation (Bank)",
  "Prize/Reward Fraud",
  "Other",
];

export default function ReportForm() {
  const [number, setNumber] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!number || !message) {
      setError("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      const r = await submitReport(number, category, message);
      setResult(r);
      setNumber("");
      setMessage("");
      setCategory(CATEGORIES[0]);

      // Auto-hide success message after 5 seconds
      setTimeout(() => setResult(null), 5000);
    } catch (err) {
      setError("Failed to submit report. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="glass p-4 sm:p-6 space-y-3 sm:space-y-5 border border-cyan-500/20"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 flex-shrink-0">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">Report Scam</h3>
          <p className="text-[10px] sm:text-xs text-gray-400">Help protect the community</p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Phone Number Input */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-[10px] sm:text-xs font-medium text-gray-300 flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Phone Number *
          </label>
          <input
            type="tel"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="e.g. 9812345678"
            className="w-full rounded-lg bg-gray-900 border border-gray-700 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Category Dropdown (Custom) */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-[10px] sm:text-xs font-medium text-gray-300 flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            Scam Category *
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full rounded-lg bg-gray-900 border border-gray-700 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all flex items-center justify-between"
            >
              <span>{category}</span>
              <svg
                className={clsx(
                  "w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform flex-shrink-0",
                  dropdownOpen && "rotate-180"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-gray-900 rounded-lg border border-cyan-500/30 shadow-xl shadow-black/50 overflow-hidden">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCategory(cat);
                      setDropdownOpen(false);
                    }}
                    className={clsx(
                      "w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-left flex items-center justify-between transition-all",
                      category === cat
                        ? "bg-cyan-500/20 text-white"
                        : "text-gray-300 hover:bg-gray-800/80"
                    )}
                  >
                    <span>{cat}</span>
                    {category === cat && (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Textarea */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-[10px] sm:text-xs font-medium text-gray-300 flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            Scam Details *
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Describe the scam message, call, or suspicious activity. Example: 'They called pretending to be from my bank and asked for OTP code...'"
            className="w-full rounded-lg bg-gray-900 border border-gray-700 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
          />
          <p className="text-[9px] sm:text-[10px] text-gray-500 flex items-center gap-1">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Never share personal information like passwords, PINs, or full card
            numbers
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={clsx(
          "w-full py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-200 shadow-lg",
          loading
            ? "bg-gray-700 cursor-not-allowed text-gray-400"
            : "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white hover:shadow-orange-500/50"
        )}
      >
        {loading ? (
          <>
            <span className="spinner" />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <span>Submit<span className="hidden sm:inline"> Report</span></span>
          </>
        )}
      </button>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2.5 sm:p-3 flex items-start gap-1.5 sm:gap-2 animate-slideUp">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-xs sm:text-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {result && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 sm:p-4 animate-slideUp">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1 space-y-0.5 sm:space-y-1">
              <p className="text-xs sm:text-sm font-medium text-green-300">
                Report Submitted Successfully!
              </p>
              <p className="text-[10px] sm:text-xs text-green-400/80">
                Scam Probability:{" "}
                <span className="font-semibold">
                  {(result.scam_probability * 100).toFixed(0)}%
                </span>
              </p>
              <p className="text-[9px] sm:text-[10px] text-gray-500 mt-1 sm:mt-2">
                Thank you for helping protect the community 🛡️
              </p>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
