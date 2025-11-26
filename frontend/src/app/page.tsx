import { Suspense } from "react";
import {
  NumberSearch,
  ReportForm,
  TrendingList,
  ScreenshotAnalyzer,
} from "../components";

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section className="glass p-4 sm:p-6 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 border-cyan-500/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 flex-shrink-0">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Phone Number Risk Analysis
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1">
              Community-powered scam detection
            </p>
          </div>
        </div>
      </section>

      {/* Number Search */}
      <section>
        <Suspense
          fallback={
            <div className="glass p-8 flex justify-center">
              <div className="spinner" />
            </div>
          }
        >
          <NumberSearch />
        </Suspense>
      </section>

      {/* Screenshot Analyzer */}
      <section>
        <ScreenshotAnalyzer />
      </section>

      {/* Report & Trending */}
      <section className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <ReportForm />
        <TrendingList />
      </section>

      {/* Quick Tips */}
      <section className="glass p-4 sm:p-6 border border-purple-500/20">
        <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 mb-3 sm:mb-4">
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
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <span>Protect Yourself</span>
        </h3>
        <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
          <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50 hover:border-red-500/30 transition-colors">
            <h4 className="font-semibold text-xs sm:text-sm text-white mb-1 flex items-center gap-1.5">
              <span className="text-red-400">×</span>
              Never Share OTP
            </h4>
            <p className="text-[10px] sm:text-xs text-gray-400">
              Banks never ask for OTP codes
            </p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50 hover:border-yellow-500/30 transition-colors">
            <h4 className="font-semibold text-xs sm:text-sm text-white mb-1 flex items-center gap-1.5">
              <span className="text-yellow-400">!</span>
              Verify Numbers
            </h4>
            <p className="text-[10px] sm:text-xs text-gray-400">
              Check suspicious numbers first
            </p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50 hover:border-blue-500/30 transition-colors">
            <h4 className="font-semibold text-xs sm:text-sm text-white mb-1 flex items-center gap-1.5">
              <span className="text-blue-400">☎</span>
              Call Bank Directly
            </h4>
            <p className="text-[10px] sm:text-xs text-gray-400">
              Use official numbers only
            </p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50 hover:border-green-500/30 transition-colors">
            <h4 className="font-semibold text-xs sm:text-sm text-white mb-1 flex items-center gap-1.5">
              <span className="text-green-400">✓</span>
              Report Scams
            </h4>
            <p className="text-[10px] sm:text-xs text-gray-400">
              Help protect the community
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
