"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Lock,
  Download,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Mail,
  FileSpreadsheet,
  Database,
  LogOut,
  ArrowLeft,
  Eye,
} from "lucide-react";
import { RegistrationRecord } from "@/lib/supabase";

interface Metrics {
  totalRegistrations: number;
  totalPiecesRequested: number;
  byProduct: Record<string, number>;
  bySize: Record<string, number>;
  byColour: Record<string, number>;
  byReferral: Record<string, number>;
}

interface IntegrationsStatus {
  supabaseConfigured: boolean;
  resendConfigured: boolean;
  googleSheetsConfigured: boolean;
  notifyEmail: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passkey, setPasskey] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [integrations, setIntegrations] = useState<IntegrationsStatus | null>(null);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductFilter, setSelectedProductFilter] = useState("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");

  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);

  // Check auth on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/registrations");
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data.registrations || []);
        setMetrics(data.metrics || null);
        setIntegrations(data.integrationsStatus || null);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
      }
    } catch (e) {
      console.error("Failed to load registrations:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(true);
        setPasskey("");
      } else {
        setAuthError(data.error || "Authentication failed. Check passkey.");
      }
    } catch {
      setAuthError("Network error. Could not authenticate.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setRegistrations([]);
  };

  const handleStatusChange = async (
    registrationId: string,
    newStatus: "pending" | "reviewed" | "contacted" | "vip"
  ) => {
    setStatusUpdatingId(registrationId);
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId, status: newStatus }),
      });

      if (res.ok) {
        setRegistrations((prev) =>
          prev.map((r) =>
            r.registration_id === registrationId ? { ...r, status: newStatus } : r
          )
        );
      }
    } catch (e) {
      console.error("Failed to update status:", e);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // Filter registrations
  const filteredRegistrations = registrations.filter((reg) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      reg.customer_name.toLowerCase().includes(q) ||
      reg.customer_email.toLowerCase().includes(q) ||
      (reg.phone && reg.phone.includes(q)) ||
      reg.registration_id.toLowerCase().includes(q);

    const matchesProduct =
      selectedProductFilter === "all" || reg.product_name === selectedProductFilter;

    const matchesStatus =
      selectedStatusFilter === "all" || reg.status === selectedStatusFilter;

    return matchesSearch && matchesProduct && matchesStatus;
  });

  // Unique products for filter dropdown
  const uniqueProducts = Array.from(new Set(registrations.map((r) => r.product_name)));

  // If loading auth state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F5F2EB] flex items-center justify-center p-6 text-[#171717]">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#777A61]">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>VERIFYING FOUNDER CREDENTIALS...</span>
        </div>
      </div>
    );
  }

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F2EB] flex items-center justify-center p-6 text-[#171717]">
        <div className="w-full max-w-md bg-[#FFFFFF] border border-[#171717] p-8 sm:p-10 shadow-[8px_8px_0px_0px_#171717]">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#171717]/15">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#777A61] block mb-1">
                AFTERCLASS ATELIER
              </span>
              <h1 className="text-2xl font-black uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                FOUNDER ACCESS
              </h1>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#171717] text-[#F5F2EB] flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          <p className="text-xs text-[#171717]/70 leading-relaxed mb-6">
            Authorized portal for <strong>Laxya</strong>, <strong>Nitin</strong>, and{" "}
            <strong>Mimansha</strong> to monitor pre-launch interest registrations, inventory demand, and automation syncs.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="passkey"
                className="block text-[11px] font-mono uppercase tracking-wider text-[#171717] mb-1.5"
              >
                Founder Passkey
              </label>
              <input
                id="passkey"
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter secret key..."
                required
                className="w-full bg-[#F5F2EB] border border-[#171717]/30 px-4 py-3 text-sm text-[#171717] placeholder:text-[#B8B5AE] focus:outline-none focus:border-[#171717] transition-colors font-mono"
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-700 text-xs font-mono">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 bg-[#171717] hover:bg-[#777A61] text-[#F5F2EB] text-xs font-bold uppercase tracking-[0.2em] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <span>ENTER DASHBOARD</span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#B8B5AE]/30 text-center">
            <Link
              href="/"
              className="text-xs uppercase tracking-widest text-[#777A61] hover:text-[#171717] inline-flex items-center gap-1.5 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#171717]">
      {/* Top Founder Navigation Ribbon */}
      <header className="bg-[#171717] text-[#F5F2EB] border-b border-[#2A2A2A] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-lg font-black uppercase tracking-tight font-[family-name:var(--font-heading)] hover:text-[#B8B5AE] transition-colors"
            >
              AFTERCLASS
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] bg-[#777A61]/40 text-[#F5F2EB] px-2 py-0.5 border border-[#777A61]">
              FOUNDER PORTAL
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/api/admin/export"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F2EB] text-[#171717] text-[11px] font-bold uppercase tracking-wider hover:bg-[#B8B5AE] transition-colors cursor-pointer"
              title="Download RFC-4180 CSV Export"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXPORT CSV</span>
            </a>

            <button
              type="button"
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2A2A2A] text-[#F5F2EB] text-[11px] font-mono uppercase tracking-wider hover:bg-[#3A3A3A] transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>REFRESH</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/20 text-[#B8B5AE] text-[11px] font-mono uppercase tracking-wider hover:text-white transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Canvas */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-12 space-y-8">
        {/* System Health Ribbon */}
        {integrations && (
          <div className="bg-[#FFFFFF] border border-[#171717]/15 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-wider">
              {/* Supabase Status */}
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#777A61]" />
                <span className="text-[#171717]/60">Supabase:</span>
                <span
                  className={`font-bold ${
                    integrations.supabaseConfigured ? "text-emerald-700" : "text-amber-600"
                  }`}
                >
                  {integrations.supabaseConfigured ? "Connected (Live)" : "Local Storage Mode"}
                </span>
              </div>

              {/* Resend Status */}
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#777A61]" />
                <span className="text-[#171717]/60">Resend:</span>
                <span
                  className={`font-bold ${
                    integrations.resendConfigured ? "text-emerald-700" : "text-amber-600"
                  }`}
                >
                  {integrations.resendConfigured ? "Configured" : "Mock Mode"}
                </span>
              </div>

              {/* Google Sheets Status */}
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#777A61]" />
                <span className="text-[#171717]/60">Google Sheets:</span>
                <span
                  className={`font-bold ${
                    integrations.googleSheetsConfigured ? "text-emerald-700" : "text-amber-600"
                  }`}
                >
                  {integrations.googleSheetsConfigured ? "Auto-Syncing" : "CSV Export Ready"}
                </span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#777A61]">
              Alerts: <span className="text-[#171717] font-semibold">{integrations.notifyEmail}</span>
            </div>
          </div>
        )}

        {/* Top Metrics Cards */}
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-[#FFFFFF] border border-[#171717] p-5 shadow-[4px_4px_0px_0px_#171717]">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#777A61] block mb-1">
                TOTAL REGISTRATIONS
              </span>
              <p className="text-3xl sm:text-4xl font-black text-[#171717] font-[family-name:var(--font-heading)]">
                {metrics.totalRegistrations}
              </p>
              <span className="text-[11px] text-[#171717]/60 mt-1 block">
                Customers on drop list
              </span>
            </div>

            <div className="bg-[#FFFFFF] border border-[#171717] p-5 shadow-[4px_4px_0px_0px_#171717]">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#777A61] block mb-1">
                PIECES REQUESTED
              </span>
              <p className="text-3xl sm:text-4xl font-black text-[#171717] font-[family-name:var(--font-heading)]">
                {metrics.totalPiecesRequested}
              </p>
              <span className="text-[11px] text-[#171717]/60 mt-1 block">
                Estimated unit demand
              </span>
            </div>

            <div className="bg-[#FFFFFF] border border-[#171717] p-5 shadow-[4px_4px_0px_0px_#171717]">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#777A61] block mb-1">
                TOP CONCEPT
              </span>
              <p className="text-lg sm:text-xl font-bold uppercase truncate text-[#171717] mt-1 font-[family-name:var(--font-heading)]">
                {Object.entries(metrics.byProduct).sort((a, b) => b[1] - a[1])[0]?.[0] || "None"}
              </p>
              <span className="text-[11px] text-[#171717]/60 mt-1 block font-mono">
                {Object.entries(metrics.byProduct).sort((a, b) => b[1] - a[1])[0]?.[1] || 0} votes
              </span>
            </div>

            <div className="bg-[#FFFFFF] border border-[#171717] p-5 shadow-[4px_4px_0px_0px_#171717]">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#777A61] block mb-1">
                TARGET DROP DATE
              </span>
              <p className="text-2xl sm:text-3xl font-black uppercase text-[#171717] font-[family-name:var(--font-heading)]">
                31.12.26
              </p>
              <span className="text-[11px] text-[#777A61] mt-1 block font-mono">
                Collection Zero
              </span>
            </div>
          </div>
        )}

        {/* Aggregate Preferences Breakdown */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* By Concept */}
            <div className="bg-[#FFFFFF] border border-[#171717]/15 p-5">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#777A61] mb-4 pb-2 border-b border-[#171717]/10">
                Demand by Concept Tee
              </h3>
              <div className="space-y-2.5 text-xs">
                {Object.entries(metrics.byProduct).length === 0 ? (
                  <p className="text-xs text-[#171717]/50 font-mono">No submissions yet.</p>
                ) : (
                  Object.entries(metrics.byProduct).map(([prod, count]) => (
                    <div key={prod} className="flex items-center justify-between">
                      <span className="font-medium truncate max-w-[200px] text-[#171717]">{prod}</span>
                      <span className="font-mono bg-[#F5F2EB] px-2 py-0.5 border border-[#171717]/10 text-[11px]">
                        {count} ({Math.round((count / (metrics.totalRegistrations || 1)) * 100)}%)
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* By Size */}
            <div className="bg-[#FFFFFF] border border-[#171717]/15 p-5">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#777A61] mb-4 pb-2 border-b border-[#171717]/10">
                Size Distribution
              </h3>
              <div className="space-y-2.5 text-xs">
                {Object.entries(metrics.bySize).length === 0 ? (
                  <p className="text-xs text-[#171717]/50 font-mono">No sizes recorded.</p>
                ) : (
                  Object.entries(metrics.bySize).map(([size, count]) => (
                    <div key={size} className="flex items-center justify-between">
                      <span className="font-medium text-[#171717]">Size {size}</span>
                      <span className="font-mono bg-[#F5F2EB] px-2 py-0.5 border border-[#171717]/10 text-[11px]">
                        {count} units
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* By Colour & Referral */}
            <div className="bg-[#FFFFFF] border border-[#171717]/15 p-5">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#777A61] mb-4 pb-2 border-b border-[#171717]/10">
                Colourway & Source
              </h3>
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-[#777A61] uppercase tracking-wider block mb-1">
                    Colours
                  </span>
                  <div className="space-y-1.5">
                    {Object.entries(metrics.byColour).map(([col, count]) => (
                      <div key={col} className="flex items-center justify-between">
                        <span className="text-[#171717]">{col}</span>
                        <span className="font-mono text-[11px] text-[#777A61]">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#171717]/10">
                  <span className="text-[10px] font-mono text-[#777A61] uppercase tracking-wider block mb-1">
                    Referrals
                  </span>
                  <div className="space-y-1.5">
                    {Object.entries(metrics.byReferral).map(([ref, count]) => (
                      <div key={ref} className="flex items-center justify-between">
                        <span className="truncate max-w-[180px] text-[#171717]">{ref}</span>
                        <span className="font-mono text-[11px] text-[#777A61]">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registrations List & Filter Section */}
        <div className="bg-[#FFFFFF] border border-[#171717] p-6 shadow-[6px_6px_0px_0px_#171717]">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#171717]/15">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                CUSTOMER INTEREST REGISTRATIONS
              </h2>
              <p className="text-xs text-[#171717]/60">
                Showing {filteredRegistrations.length} of {registrations.length} entries
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-3 text-[#B8B5AE]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, email, ID..."
                  className="w-full bg-[#F5F2EB] border border-[#171717]/30 pl-9 pr-3 py-2 text-xs text-[#171717] placeholder:text-[#B8B5AE] focus:outline-none focus:border-[#171717]"
                />
              </div>

              {/* Product Filter */}
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#777A61]" />
                <select
                  value={selectedProductFilter}
                  onChange={(e) => setSelectedProductFilter(e.target.value)}
                  className="bg-[#F5F2EB] border border-[#171717]/30 px-2.5 py-2 text-xs text-[#171717] focus:outline-none"
                >
                  <option value="all">All Concepts</option>
                  {uniqueProducts.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-[#F5F2EB] border border-[#171717]/30 px-2.5 py-2 text-xs text-[#171717] focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="contacted">Contacted</option>
                <option value="vip">VIP</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#171717] text-[10px] font-mono uppercase tracking-wider text-[#777A61]">
                  <th className="py-3 px-2">Reg ID</th>
                  <th className="py-3 px-2">Date (IST)</th>
                  <th className="py-3 px-2">Customer Details</th>
                  <th className="py-3 px-2">Concept / Selection</th>
                  <th className="py-3 px-2">Referral</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Sync Status</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171717]/10 font-sans">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-xs text-[#171717]/60 font-mono">
                      No registrations found matching the current filters.
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.registration_id} className="hover:bg-[#F5F2EB]/50 transition-colors">
                      {/* Registration ID */}
                      <td className="py-3.5 px-2 font-mono font-bold text-[#171717] whitespace-nowrap">
                        {reg.registration_id}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-2 text-[#777A61] whitespace-nowrap font-mono text-[11px]">
                        {new Date(reg.created_at).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* Customer Info */}
                      <td className="py-3.5 px-2">
                        <div className="font-semibold text-[#171717]">{reg.customer_name}</div>
                        <a
                          href={`mailto:${reg.customer_email}`}
                          className="text-[#777A61] hover:underline block text-[11px]"
                        >
                          {reg.customer_email}
                        </a>
                        {reg.phone && (
                          <div className="text-[10px] font-mono text-[#171717]/70">
                            Ph: {reg.phone}
                          </div>
                        )}
                      </td>

                      {/* Concept & Sizing */}
                      <td className="py-3.5 px-2">
                        <div className="font-bold text-[#171717]">{reg.product_name}</div>
                        <div className="text-[11px] text-[#777A61] flex items-center gap-1.5 mt-0.5">
                          <span>Size: <strong>{reg.size}</strong></span>
                          <span>•</span>
                          <span>{reg.colour}</span>
                          <span>•</span>
                          <span>Qty: <strong>{reg.quantity}</strong></span>
                        </div>
                      </td>

                      {/* Referral */}
                      <td className="py-3.5 px-2 text-[#777A61] text-[11px]">
                        {reg.referral_source || "website"}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-2">
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border ${
                            reg.status === "contacted"
                              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                              : reg.status === "vip"
                              ? "bg-purple-100 text-purple-800 border-purple-300"
                              : reg.status === "reviewed"
                              ? "bg-blue-100 text-blue-800 border-blue-300"
                              : "bg-[#F5F2EB] text-[#777A61] border-[#B8B5AE]"
                          }`}
                        >
                          {reg.status}
                        </span>
                      </td>

                      {/* Sync Status Badges */}
                      <td className="py-3.5 px-2">
                        <div className="flex flex-col gap-1 text-[10px] font-mono">
                          <span
                            className={
                              reg.customer_email_status === "sent"
                                ? "text-emerald-700"
                                : "text-[#777A61]"
                            }
                          >
                            Email: {reg.customer_email_status}
                          </span>
                          <span
                            className={
                              reg.sheets_sync_status === "synced"
                                ? "text-emerald-700"
                                : "text-[#777A61]"
                            }
                          >
                            Sheets: {reg.sheets_sync_status}
                          </span>
                        </div>
                      </td>

                      {/* Action Menu */}
                      <td className="py-3.5 px-2 text-right">
                        <select
                          value={reg.status}
                          disabled={statusUpdatingId === reg.registration_id}
                          onChange={(e) =>
                            handleStatusChange(
                              reg.registration_id,
                              e.target.value as "pending" | "reviewed" | "contacted" | "vip"
                            )
                          }
                          className="bg-[#F5F2EB] border border-[#171717]/20 px-2 py-1 text-[11px] focus:outline-none cursor-pointer"
                        >
                          <option value="pending">Mark Pending</option>
                          <option value="reviewed">Mark Reviewed</option>
                          <option value="contacted">Mark Contacted</option>
                          <option value="vip">Mark VIP</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
