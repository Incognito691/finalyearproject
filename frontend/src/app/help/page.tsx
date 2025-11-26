"use client";
import { useState } from "react";

export default function HelpPage() {
  const [activeSection, setActiveSection] = useState("check");

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="glass p-8 space-y-4 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Help & User Guide
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Learn how to protect yourself from scams
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="glass p-2 flex gap-2">
        <button
          onClick={() => setActiveSection("check")}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSection === "check"
              ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          Check Numbers
        </button>
        <button
          onClick={() => setActiveSection("report")}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSection === "report"
              ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          Report Scams
        </button>
        <button
          onClick={() => setActiveSection("screenshot")}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSection === "screenshot"
              ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          Screenshot Analysis
        </button>
        <button
          onClick={() => setActiveSection("understand")}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeSection === "understand"
              ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          Understanding Results
        </button>
      </div>

      {/* Check Numbers Guide */}
      {activeSection === "check" && (
        <section className="glass p-6 space-y-6 animate-fadeIn">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            How to Check a Phone Number
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-800/40 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-sm">
                  1
                </span>
                Enter the Phone Number
              </div>
              <p className="text-sm text-gray-300 pl-8">
                Go to the homepage and enter a Nepali mobile number in the
                search box. Format:{" "}
                <code className="bg-gray-700 px-2 py-0.5 rounded">
                  9812345678
                </code>{" "}
                or{" "}
                <code className="bg-gray-700 px-2 py-0.5 rounded">
                  +9779812345678
                </code>
              </p>
            </div>

            <div className="bg-gray-800/40 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-sm">
                  2
                </span>
                Click "Check Risk"
              </div>
              <p className="text-sm text-gray-300 pl-8">
                Our AI will analyze all community reports and calculate a risk
                score based on:
              </p>
              <ul className="text-sm text-gray-400 pl-12 space-y-1">
                <li>• Number of scam reports</li>
                <li>• AI scam probability from message analysis</li>
                <li>• Recent activity patterns (anomalies)</li>
                <li>• SIM swap indicators</li>
              </ul>
            </div>

            <div className="bg-gray-800/40 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-sm">
                  3
                </span>
                Review the Results
              </div>
              <p className="text-sm text-gray-300 pl-8">
                You'll see a detailed risk analysis including:
              </p>
              <ul className="text-sm text-gray-400 pl-12 space-y-1">
                <li>
                  • <strong className="text-green-400">LOW</strong> /{" "}
                  <strong className="text-yellow-400">MEDIUM</strong> /{" "}
                  <strong className="text-red-400">HIGH</strong> risk level
                </li>
                <li>• Visual risk gauge (0-100%)</li>
                <li>• Total report count</li>
                <li>• Detected anomalies (spikes, repeated messages)</li>
                <li>• SIM swap detection status</li>
                <li>• Recent reports with categories</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-sm text-yellow-200">
              <strong>Note:</strong> If a number has no reports yet, you'll see
              an error. This doesn't mean it's safe—it just means nobody has
              reported it yet!
            </p>
          </div>
        </section>
      )}

      {/* Report Scams Guide */}
      {activeSection === "report" && (
        <section className="glass p-6 space-y-6 animate-fadeIn">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <svg
              className="w-6 h-6 text-orange-400"
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
            How to Report a Scam
          </h2>

          <div className="space-y-4">
            <p className="text-gray-300">
              Reporting scams helps protect the entire community. Here's what to
              report:
            </p>

            <div className="bg-gray-800/40 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-orange-400">What to Report</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Suspicious messages</strong> asking for OTP codes,
                    passwords, or bank details
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Fake prize/reward notifications</strong> claiming
                    you've won lottery or cash
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Impersonation attempts</strong> pretending to be
                    banks, Khalti, eSewa, or government
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Fake job offers</strong> asking for upfront payment
                    or personal documents
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Urgent requests</strong> claiming your account is
                    blocked or needs verification
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/40 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-cyan-400">
                How to Submit a Report
              </h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <strong>1. Enter the phone number</strong> that contacted you
                </p>
                <p>
                  <strong>2. Select the scam category:</strong>
                </p>
                <ul className="pl-6 space-y-1 text-gray-400">
                  <li>• eSewa/Khalti Wallet Scam</li>
                  <li>• OTP Theft Attempt</li>
                  <li>• Fake Job Offer</li>
                  <li>• Impersonation (Bank)</li>
                  <li>• Prize/Reward Fraud</li>
                  <li>• Other</li>
                </ul>
                <p>
                  <strong>3. Describe the scam message or call</strong> - be
                  specific! Include what they asked for, what they said, etc.
                </p>
                <p>
                  <strong>4. Click "Submit Report"</strong>
                </p>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-300 mb-2">
                ⚠ Do NOT include in your report:
              </h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Your own phone number or personal details</li>
                <li>• Your bank account or card numbers</li>
                <li>• OTP codes or passwords</li>
                <li>• Any private information that could identify you</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Screenshot Analysis Guide */}
      {activeSection === "screenshot" && (
        <section className="glass p-6 space-y-6 animate-fadeIn">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <svg
              className="w-6 h-6 text-purple-400"
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
            Screenshot Analysis (AI-Powered)
          </h2>

          <div className="space-y-4">
            <p className="text-gray-300">
              Upload screenshots of suspicious SMS, WhatsApp, Viber, or
              Messenger messages for instant AI analysis!
            </p>

            <div className="bg-gray-800/40 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-purple-400">How It Works</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold flex-shrink-0">
                    1
                  </span>
                  <div>
                    <strong>Upload Image:</strong> Take a screenshot of the
                    suspicious message on your phone
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold flex-shrink-0">
                    2
                  </span>
                  <div>
                    <strong>AI OCR Extraction:</strong> Our system reads the
                    text from your image using Optical Character Recognition
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold flex-shrink-0">
                    3
                  </span>
                  <div>
                    <strong>Scam Detection:</strong> The extracted text is
                    analyzed for scam keywords, patterns, and probability
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold flex-shrink-0">
                    4
                  </span>
                  <div>
                    <strong>Instant Results:</strong> You get a risk assessment
                    (LOW/MEDIUM/HIGH) and detailed explanation
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/40 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-cyan-400">
                Best Practices for Screenshots
              </h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Make sure text is <strong>clear and readable</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Include the <strong>full message</strong> (don't crop
                    important parts)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Use <strong>good lighting</strong> (no glare or shadows)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Supported formats: <strong>JPG, PNG, WEBP</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Blur out personal info</strong> (your name, phone,
                    address) before uploading
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-sm text-green-200">
                <strong>Available Now:</strong> Screenshot analysis feature is
                available on the homepage. Look for the "Screenshot Scam Analyzer"
                section to get started!
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Understanding Results */}
      {activeSection === "understand" && (
        <section className="glass p-6 space-y-6 animate-fadeIn">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <svg
              className="w-6 h-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Understanding Risk Levels
          </h2>

          <div className="space-y-4">
            <div className="bg-green-500/10 border-l-4 border-green-500 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-green-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs">
                  ✓
                </span>
                LOW RISK (0-33%)
              </h3>
              <p className="text-sm text-gray-300">
                Few or no reports, low scam probability. The number appears
                relatively safe based on current data.
              </p>
              <p className="text-xs text-gray-400">
                <strong>Action:</strong> Proceed with normal caution. Still
                verify unexpected requests.
              </p>
            </div>

            <div className="bg-yellow-500/10 border-l-4 border-yellow-500 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-yellow-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-xs">
                  !
                </span>
                MEDIUM RISK (34-66%)
              </h3>
              <p className="text-sm text-gray-300">
                Moderate number of reports or some suspicious patterns detected.
                Exercise caution.
              </p>
              <p className="text-xs text-gray-400">
                <strong>Action:</strong> Be very careful. Do NOT share OTPs,
                passwords, or bank details. Verify through official channels.
              </p>
            </div>

            <div className="bg-red-500/10 border-l-4 border-red-500 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-red-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-xs">
                  ⚠
                </span>
                HIGH RISK (67-100%)
              </h3>
              <p className="text-sm text-gray-300">
                Many reports, high scam probability, or multiple red flags.
                Strong evidence of fraudulent activity.
              </p>
              <p className="text-xs text-gray-400">
                <strong>Action:</strong>{" "}
                <strong className="text-red-300">AVOID INTERACTION.</strong>{" "}
                Block the number. Report to authorities if threatened.
              </p>
            </div>

            <div className="bg-gray-800/40 rounded-lg p-4 space-y-3 mt-6">
              <h3 className="font-semibold text-purple-400">
                Anomaly Indicators
              </h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>
                  <strong className="text-orange-400">SPIKE:</strong> 3+ reports
                  in the last hour (unusual surge)
                </li>
                <li>
                  <strong className="text-orange-400">BURST:</strong> 5+ reports
                  in the last hour (very unusual)
                </li>
                <li>
                  <strong className="text-orange-400">REPEATED MESSAGE:</strong>{" "}
                  Same/similar messages reported multiple times
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/40 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-purple-400">
                Post-SIM-Swap Activity Detection (Community-Based)
              </h3>
              <p className="text-sm text-gray-300">
                <strong className="text-yellow-300">Important:</strong> We detect suspicious behavioral patterns from community reports that MAY indicate post-SIM-swap scam activity. We do NOT have access to telecom data (actual SIM replacements, IMEI changes, network logs).
              </p>
              <p className="text-sm text-gray-400 mt-2">
                If marked as "DETECTED", our system found multiple behavioral indicators:
              </p>
              <ul className="text-sm text-gray-300 space-y-2 mt-2">
                <li>
                  <strong>Recent Surge:</strong> Unusual spike of 3+ reports within 48 hours
                </li>
                <li>
                  <strong>OTP Focus:</strong> 50%+ of reports involve OTP theft attempts
                </li>
                <li>
                  <strong>High ML Probability:</strong> 3+ reports with scam probability &gt;70%
                </li>
                <li>
                  <strong>Victim Self-Report:</strong> Keywords like "hacked", "not me", "unauthorized" detected
                </li>
                <li>
                  <strong>Multi-Category Attack:</strong> 3+ different scam types reported within 48 hours
                </li>
              </ul>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 mt-3">
                <p className="text-xs text-blue-200">
                  <strong>How it works:</strong> Community members report suspicious calls/messages. Our AI analyzes patterns that typically appear AFTER someone's number is compromised (SIM swap, account takeover, etc.). This is crowd-sourced detection, not telecom-level monitoring.
                </p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded p-3 mt-3">
                <p className="text-xs text-red-200">
                  <strong>If your own number shows suspicious activity flags:</strong>{" "}
                  Contact your telecom provider immediately, check for unauthorized SIM changes, review recent bank/wallet transactions, and change important passwords.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick Tips */}
      <section className="glass p-6 space-y-4 bg-gradient-to-br from-green-500/5 to-transparent border-green-500/20">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <svg
            className="w-6 h-6 text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Quick Safety Tips
        </h2>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>
              Never share OTP codes with anyone—not even "bank officials"
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>
              Banks/e-wallets will NEVER ask for passwords or PINs via call/SMS
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>
              Be skeptical of "urgent" requests to verify accounts or claim
              prizes
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>
              Check sender numbers—official orgs use consistent short codes
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>
              When in doubt, call your bank/provider using the number on their
              official website
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
