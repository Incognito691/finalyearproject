"use client";
import { useState, type FormEvent } from "react";
import clsx from "clsx";
import { fetchNumber } from "../lib/api";

interface RiskData {
  number: string;
  risk_score: number;
  risk_level: string;
  report_count: number;
  anomalies: string[];
  suspicious_activity: {
    suspicious_activity_detected: boolean;
    confidence: string;
    likely_scenario: string;
    flags: {
      recent_surge: boolean;
      otp_focus: boolean;
      high_prob_cluster: boolean;
      victim_self_report: boolean;
      multi_category_attack: boolean;
    };
    recent_report_count: number;
    otp_proportion: number;
    unique_categories: string[];
    disclaimer: string;
  };
  recent_reports: Array<{
    category: string;
    created_at: string;
    scam_probability: number;
  }>;
}

export default function NumberSearch() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  async function handleLookup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setResult(null);
    const query = value.trim();
    if (!query) return;
    setLoading(true);
    try {
      const numeric = query.replace(/[^0-9]/g, "");
      if (numeric.length < 10) {
        setError("Please enter a valid Nepali mobile number.");
        return;
      }
      const data = await fetchNumber(numeric);
      setResult(data);
    } catch (err) {
      setError("Lookup failed. Number may not have reports yet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleLookup} className="glass p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. 9812345678"
            className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
          <button
            disabled={loading}
            className={clsx(
              "px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-lg whitespace-nowrap",
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:shadow-cyan-500/50"
            )}
          >
            {loading && <span className="spinner" />}
            {loading ? "Analyzing..." : "Check Risk"}
          </button>
        </div>
        {error && (
          <p className="text-red-400 text-xs sm:text-sm mt-3 flex items-center gap-2">
            <svg
              className="w-4 h-4 flex-shrink-0"
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
          {/* Risk Score Card */}
          <div className="glass p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-bold">
                  Risk Analysis
                </h3>
                <p className="text-xs text-gray-400 mt-0.5 sm:mt-1 font-mono">
                  {result.number}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div
                  className={clsx("text-2xl sm:text-3xl font-bold", {
                    "text-green-400": result.risk_level === "LOW",
                    "text-yellow-400": result.risk_level === "MEDIUM",
                    "text-red-400": result.risk_level === "HIGH",
                  })}
                >
                  {result.risk_level}
                </div>
                <div className="text-xs text-gray-400 mt-0.5 sm:mt-1">
                  Score: {(result.risk_score * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Visual Risk Gauge */}
            <div className="space-y-2">
              <div className="h-2.5 sm:h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={clsx(
                    "h-full rounded-full transition-all duration-500 ease-out",
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
                    width: `${Math.min(result.risk_score * 100, 100)}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-500">
                <span>Safe</span>
                <span>Suspicious</span>
                <span>High Risk</span>
              </div>
            </div>

            {/* Report Count */}
            <div className="flex items-center gap-2 text-xs sm:text-sm pt-2 border-t border-gray-700/50">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-gray-300">
                <span className="font-semibold text-white">
                  {result.report_count}
                </span>{" "}
                total reports
              </span>
            </div>
          </div>

          {/* Anomalies */}
          {result.anomalies.length > 0 && (
            <div className="glass p-4 sm:p-5 space-y-2 sm:space-y-3">
              <h4 className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-orange-400">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Anomalies Detected
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {result.anomalies.map((a) => (
                  <span
                    key={a}
                    className="px-2 sm:px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-[10px] sm:text-xs font-medium"
                  >
                    {a.replace(/_/g, " ").toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Suspicious Activity Detection */}
          <div className="glass p-4 sm:p-5 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0"
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
                <span className="hidden sm:inline">Post-SIM-Swap Activity</span>
                <span className="sm:hidden">Suspicious Activity</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  title="Learn how this works"
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </h4>
              <span
                className={clsx(
                  "px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase flex-shrink-0",
                  result.suspicious_activity.suspicious_activity_detected
                    ? "bg-red-500/20 border border-red-500/40 text-red-300 animate-pulse"
                    : "bg-green-500/20 border border-green-500/40 text-green-300"
                )}
              >
                {result.suspicious_activity.suspicious_activity_detected
                  ? "⚠ DETECTED"
                  : "✓ CLEAR"}
              </span>
            </div>

            {result.suspicious_activity.suspicious_activity_detected && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-sm font-medium text-red-300">
                  {result.suspicious_activity.likely_scenario}
                </p>
                <p className="text-xs text-red-400/80 mt-1">
                  Confidence:{" "}
                  {result.suspicious_activity.confidence.toUpperCase()}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-[10px] sm:text-xs">
              <div className="flex items-center gap-2">
                <div
                  className={clsx(
                    "w-2 h-2 rounded-full",
                    result.suspicious_activity.flags.recent_surge
                      ? "bg-red-400 animate-pulse"
                      : "bg-gray-600"
                  )}
                />
                <span
                  className={
                    result.suspicious_activity.flags.recent_surge
                      ? "text-white font-medium"
                      : "text-gray-500"
                  }
                >
                  Recent Surge (48h)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={clsx(
                    "w-2 h-2 rounded-full",
                    result.suspicious_activity.flags.otp_focus
                      ? "bg-red-400 animate-pulse"
                      : "bg-gray-600"
                  )}
                />
                <span
                  className={
                    result.suspicious_activity.flags.otp_focus
                      ? "text-white font-medium"
                      : "text-gray-500"
                  }
                >
                  OTP Theft Focus
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={clsx(
                    "w-2 h-2 rounded-full",
                    result.suspicious_activity.flags.high_prob_cluster
                      ? "bg-red-400 animate-pulse"
                      : "bg-gray-600"
                  )}
                />
                <span
                  className={
                    result.suspicious_activity.flags.high_prob_cluster
                      ? "text-white font-medium"
                      : "text-gray-500"
                  }
                >
                  High ML Probability
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={clsx(
                    "w-2 h-2 rounded-full",
                    result.suspicious_activity.flags.victim_self_report
                      ? "bg-red-400 animate-pulse"
                      : "bg-gray-600"
                  )}
                />
                <span
                  className={
                    result.suspicious_activity.flags.victim_self_report
                      ? "text-white font-medium"
                      : "text-gray-500"
                  }
                >
                  Victim Self-Report
                </span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <div
                  className={clsx(
                    "w-2 h-2 rounded-full",
                    result.suspicious_activity.flags.multi_category_attack
                      ? "bg-red-400 animate-pulse"
                      : "bg-gray-600"
                  )}
                />
                <span
                  className={
                    result.suspicious_activity.flags.multi_category_attack
                      ? "text-white font-medium"
                      : "text-gray-500"
                  }
                >
                  Multi-Category Attack (
                  {result.suspicious_activity.unique_categories.length} types)
                </span>
              </div>
            </div>

            <div className="text-[10px] sm:text-xs text-gray-400 pt-1.5 sm:pt-2 border-t border-gray-700 space-y-0.5 sm:space-y-1">
              <div className="flex justify-between">
                <span>Recent activity:</span>
                <span className="font-medium">
                  {result.suspicious_activity.recent_report_count} reports (48h)
                </span>
              </div>
              <div className="flex justify-between">
                <span>OTP-related:</span>
                <span className="font-medium">
                  {(result.suspicious_activity.otp_proportion * 100).toFixed(0)}
                  %
                </span>
              </div>
              {result.suspicious_activity.unique_categories.length > 0 && (
                <div className="pt-1 sm:pt-2">
                  <span className="text-gray-500">Categories: </span>
                  <span className="text-gray-300 text-[9px] sm:text-[10px]">
                    {result.suspicious_activity.unique_categories.join(", ")}
                  </span>
                </div>
              )}
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 sm:p-3 text-[9px] sm:text-[10px] text-blue-300">
              ℹ️ {result.suspicious_activity.disclaimer}
            </div>
          </div>

          {/* Recent Reports */}
          {result.recent_reports.length > 0 && (
            <div className="glass p-4 sm:p-5 space-y-2 sm:space-y-3">
              <h4 className="text-xs sm:text-sm font-semibold">
                Recent Reports
              </h4>
              <div className="space-y-1.5 sm:space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
                {result.recent_reports.slice(0, 5).map((r, i) => (
                  <div
                    key={i}
                    className="bg-gray-800/50 rounded-lg p-2.5 sm:p-3 text-[10px] sm:text-xs space-y-0.5 sm:space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-cyan-400 truncate">
                        {r.category}
                      </span>
                      <span className="text-gray-500 text-[9px] sm:text-xs flex-shrink-0">
                        {new Date(r.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-gray-400">
                      Scam probability: {(r.scam_probability * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Educational Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base sm:text-xl font-bold text-white flex items-center gap-1.5 sm:gap-2">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:inline">
                  How Post-SIM-Swap Activity Detection Works
                </span>
                <span className="sm:hidden">SIM Swap Detection</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-4">
                <p className="text-blue-300 font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm">
                  ⚠️ Important Clarification
                </p>
                <p className="text-gray-300 text-[10px] sm:text-xs leading-relaxed">
                  This system does NOT detect actual SIM replacement events.
                  True SIM swap detection requires access to telecom carrier
                  metadata (IMEI changes, SIM serial numbers, network handoff
                  logs) which is only available to mobile network operators.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h4 className="font-semibold text-green-300 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  What We CAN Detect (Behavioral Proxies)
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 text-gray-300 text-[10px] sm:text-xs">
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    <div>
                      <span className="font-medium">
                        Sudden Activity Spike:
                      </span>{" "}
                      Unusual surge in scam reports within 48 hours (3+ reports
                      when historical average is ≤1 per week)
                    </div>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    <div>
                      <span className="font-medium">OTP Theft Pattern:</span>{" "}
                      High concentration of OTP/verification code phishing
                      attempts (≥50% of reports)
                    </div>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    <div>
                      <span className="font-medium">
                        ML Confidence Cluster:
                      </span>{" "}
                      Multiple reports with high scam probability scores (≥3
                      reports with ML score &gt;70%)
                    </div>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    <div>
                      <span className="font-medium">Victim Self-Reports:</span>{" "}
                      User-submitted reports containing keywords like "hacked",
                      "not me", "unauthorized", "stolen account"
                    </div>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    <div>
                      <span className="font-medium">Multi-Vector Attack:</span>{" "}
                      Reports spanning 3+ different scam categories within 48
                      hours (e.g., impersonation + phishing + financial fraud)
                    </div>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h4 className="font-semibold text-red-300 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  What We CANNOT Detect
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 text-gray-300 text-[10px] sm:text-xs">
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                    <div>
                      <span className="font-medium">
                        Actual SIM Replacement:
                      </span>{" "}
                      Physical SIM card changes or eSIM profile switches
                      (requires carrier-level access)
                    </div>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                    <div>
                      <span className="font-medium">Device Metadata:</span> IMEI
                      changes, SIM serial numbers, network registration events
                    </div>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                    <div>
                      <span className="font-medium">Telecom Logs:</span> Network
                      handoff data, authentication failures, location tower
                      switches
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 sm:p-4">
                <h4 className="font-semibold text-purple-300 mb-1.5 sm:mb-2 text-xs sm:text-sm">
                  How It Works
                </h4>
                <p className="text-gray-300 text-[10px] sm:text-xs leading-relaxed">
                  When a phone number shows suspicious activity, it often
                  indicates that scammers have gained control of the victim's
                  accounts (potentially through SIM swap, account takeover, or
                  credential theft). Our system looks for{" "}
                  <span className="text-white font-medium">
                    behavioral patterns typical of post-compromise scam
                    campaigns
                  </span>{" "}
                  rather than detecting the compromise itself.
                </p>
                <p className="text-gray-400 text-[10px] mt-2 italic">
                  Example: If a number suddenly receives 5 reports in 24 hours
                  (all OTP-related, high ML scores, with messages like "hacked
                  bank account"), our system flags this as suspicious activity
                  that MAY indicate a recent SIM swap or account breach.
                </p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2.5 sm:p-3">
                <p className="text-yellow-300 text-[10px] sm:text-xs font-medium">
                  🛡️ This is an academic project demonstrating behavioral
                  analysis for scam detection, NOT a replacement for
                  telecom-level security systems.
                </p>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
