"use client";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="glass p-8 space-y-4 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              About ScamGuard Nepal
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              AI-Powered Fraud Detection & SIM Swap Monitoring
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="glass p-6 space-y-4">
        <h2 className="text-xl font-bold">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed">
          ScamGuard Nepal is a community-driven platform designed to protect
          Nepali mobile users from scams, fraud, and SIM swap attacks. By
          combining AI-powered text analysis with crowd-sourced reporting, we
          help users identify suspicious numbers and messages before they become
          victims.
        </p>
        <p className="text-gray-300 leading-relaxed">
          This is a{" "}
          <strong className="text-cyan-400">Final Year Project (FYP)</strong>{" "}
          developed to address the growing threat of mobile fraud in Nepal,
          where scammers frequently target e-wallet users (Khalti, eSewa), bank
          customers, and everyday citizens through fake OTPs, prize scams, and
          impersonation attacks.
        </p>
      </section>

      {/* Key Features */}
      <section className="glass p-6 space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <svg
            className="w-6 h-6 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-800/40 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-cyan-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Number Risk Analysis
            </h3>
            <p className="text-sm text-gray-400">
              Check any Nepali mobile number for scam risk using AI-powered
              scoring and community reports.
            </p>
          </div>

          <div className="bg-gray-800/40 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-purple-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Post-SIM-Swap Activity Detection
            </h3>
            <p className="text-sm text-gray-400">
              Detect suspicious behavioral patterns from community reports that may indicate post-SIM-swap scam activity. Uses crowd-sourced data and anomaly detection (not telecom metadata).
            </p>
          </div>

          <div className="bg-gray-800/40 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-orange-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Community Reports
            </h3>
            <p className="text-sm text-gray-400">
              Submit scam reports categorized by type (OTP theft, fake jobs,
              prize fraud, impersonation).
            </p>
          </div>

          <div className="bg-gray-800/40 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-green-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Screenshot Analysis
            </h3>
            <p className="text-sm text-gray-400">
              Upload screenshots of suspicious messages for AI-powered OCR and
              scam detection analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="glass p-6 space-y-4">
        <h2 className="text-xl font-bold">Technology Stack</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-cyan-400 mb-2">Frontend</h3>
            <ul className="space-y-1 text-gray-400">
              <li>• Next.js 14 (React)</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Glass Morphism UI</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-purple-400 mb-2">Backend</h3>
            <ul className="space-y-1 text-gray-400">
              <li>• FastAPI (Python)</li>
              <li>• MongoDB Atlas</li>
              <li>• Uvicorn</li>
              <li>• Pydantic Validation</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-orange-400 mb-2">AI & ML</h3>
            <ul className="space-y-1 text-gray-400">
              <li>• Text Classification (baseline)</li>
              <li>• Anomaly Detection</li>
              <li>• Risk Scoring Algorithm</li>
              <li>• Future: Transformers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="glass p-6 space-y-4">
        <h2 className="text-xl font-bold">How It Works</h2>
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-semibold text-white">Community Reporting</h3>
              <p className="text-sm text-gray-400 mt-1">
                Users submit scam reports with phone numbers, categories, and
                message details.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-semibold text-white">AI Analysis</h3>
              <p className="text-sm text-gray-400 mt-1">
                Text is analyzed for scam keywords, patterns, and probability
                scoring using ML models.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-semibold text-white">Risk Aggregation</h3>
              <p className="text-sm text-gray-400 mt-1">
                Risk scores combine ML probability, report count, anomalies, and
                SIM swap indicators.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-bold flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="font-semibold text-white">Public Access</h3>
              <p className="text-sm text-gray-400 mt-1">
                Anyone can search numbers and view risk analysis, trending
                scams, and community insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="glass p-6 space-y-3 border-yellow-500/30">
        <h2 className="text-lg font-bold flex items-center gap-2 text-yellow-400">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Important Disclaimer
        </h2>
        <p className="text-sm text-gray-300">
          ScamGuard Nepal is an <strong>educational prototype</strong> and Final
          Year Project. AI predictions are probabilistic and based on
          crowd-sourced data, not definitive proof of fraud. Always verify
          suspicious activity through official channels (your bank, telecom
          provider, police).
        </p>
        <p className="text-sm text-gray-400">
          This platform does not replace official fraud reporting mechanisms.
          For serious cases, contact Nepal Police Cyber Bureau or your service
          provider.
        </p>
      </section>

      {/* Team */}
      <section className="glass p-6 space-y-4">
        <h2 className="text-xl font-bold">Project Team</h2>
        <p className="text-sm text-gray-400">
          Final Year Project (FYP) • Academic Year 2024-2025
        </p>
        <p className="text-sm text-gray-400">
          Built with dedication to protect the Nepali community from mobile
          fraud.
        </p>
      </section>
    </div>
  );
}
