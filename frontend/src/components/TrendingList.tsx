"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { fetchTrending } from "../lib/api";

interface TrendingItem {
  number: string;
  reports: number;
}

export default function TrendingList() {
  const [items, setItems] = useState<TrendingItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const data = await fetchTrending();
        if (active) setItems(data.items || []);
      } catch (e) {
        setError("Failed to load trending");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="glass p-4 sm:p-6 space-y-3 sm:space-y-4 border border-purple-500/20">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20 flex-shrink-0">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">Trending Scams</h3>
          <p className="text-[10px] sm:text-xs text-gray-400">Most reported<span className="hidden sm:inline"> numbers</span> (24h)</p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="spinner" />
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2.5 sm:p-3 flex items-center gap-1.5 sm:gap-2">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-xs sm:text-sm text-red-300">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-1.5 sm:space-y-2">
          {items.length > 0 ? (
            items.map((it, index) => (
              <div
                key={it.number}
                className="bg-gray-800/30 hover:bg-gray-800/50 rounded-lg p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3 transition-all border border-gray-700/50 hover:border-purple-500/30"
              >
                <div className={clsx(
                  "w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0",
                  index === 0 ? "bg-red-500/20 text-red-300" :
                  index === 1 ? "bg-orange-500/20 text-orange-300" :
                  index === 2 ? "bg-yellow-500/20 text-yellow-300" :
                  "bg-purple-500/20 text-purple-300"
                )}>
                  #{index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono font-semibold text-white text-xs sm:text-sm">{it.number}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500"><span className="hidden sm:inline">Phone </span>Number</div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-red-500/20 border border-red-500/40 flex items-center gap-1 sm:gap-1.5">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[10px] sm:text-xs font-bold text-red-300">{it.reports}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 sm:py-8 space-y-1.5 sm:space-y-2">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs sm:text-sm text-gray-500">No trending scams yet</p>
              <p className="text-[10px] sm:text-xs text-gray-600">Be the first to report<span className="hidden sm:inline"> suspicious numbers</span></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
