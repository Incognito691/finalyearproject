import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "SIM Swap & Scam Detection | Nepal",
  description:
    "AI-powered fraud detection and SIM swap monitoring for Nepali mobile numbers",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-950 text-gray-100 antialiased">
        <header className="border-b border-gray-800/50 backdrop-blur-xl bg-gray-950/80 sticky top-0 z-50">
          <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
            <a
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  ScamGuard Nepal
                </h1>
                <p className="text-[10px] text-gray-500">AI Fraud Detection</p>
              </div>
            </a>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <a
                href="/scam-gallery"
                className="hover:text-cyan-400 transition-colors"
              >
                Scam Gallery
              </a>
              <a
                href="/about"
                className="hover:text-cyan-400 transition-colors"
              >
                About
              </a>
              <a href="/help" className="hover:text-cyan-400 transition-colors">
                Help
              </a>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-8 space-y-8">
          {children}
        </main>
        <footer className="border-t border-gray-800/50 mt-16">
          <div className="mx-auto max-w-5xl px-6 py-6 flex items-center justify-between text-xs text-gray-500">
            <p>© 2025 ScamGuard Nepal • FYP Project</p>
            <p className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Prototype - AI predictions are not definitive proof
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
