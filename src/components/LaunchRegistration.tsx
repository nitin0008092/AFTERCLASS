"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function LaunchRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "exists">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setMessage("");

    // Basic frontend checks
    if (!name.trim()) {
      setStatus("error");
      setMessage("Please enter your name.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          instagram: instagram.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Failed to submit. Please try again.");
      } else if (data.alreadyRegistered) {
        setStatus("exists");
        setMessage(data.message || "You are already registered on our list!");
      } else {
        setStatus("success");
        setMessage(
          data.message || "You're confirmed for early drop access on December 31, 2026."
        );
        setName("");
        setEmail("");
        setInstagram("");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please verify your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="py-24 sm:py-32 bg-[#F5F2EB] border-b border-[#171717]/15">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="border border-[#171717] bg-[#FFFFFF] p-8 sm:p-14 shadow-[10px_10px_0px_0px_#171717]">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 mb-4 text-[11px] font-mono uppercase tracking-[0.2em] text-[#777A61]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#777A61]" />
              LAUNCH DATE: DECEMBER 31, 2026
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-[-0.04em] text-[#171717] font-[family-name:var(--font-heading)] mb-4">
              BE HERE BEFORE <br />
              THE DROP.
            </h2>
            <p className="text-sm sm:text-base text-[#171717]/70 leading-relaxed">
              Get launch updates, first looks, and early access announcements before the public release.
              Strictly limited allocation for Drop 01.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
            <div className="space-y-1.5">
              <label
                htmlFor="reg-name"
                className="block text-xs font-mono uppercase tracking-wider text-[#171717]"
              >
                Full Name <span className="text-[#777A61]">*</span>
              </label>
              <input
                id="reg-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Sharma"
                disabled={loading}
                required
                className="w-full bg-[#F5F2EB] border border-[#171717]/30 px-4 py-3.5 text-sm text-[#171717] placeholder:text-[#B8B5AE] focus:outline-none focus:border-[#171717] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="reg-email"
                className="block text-xs font-mono uppercase tracking-wider text-[#171717]"
              >
                Email Address <span className="text-[#777A61]">*</span>
              </label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@domain.com"
                disabled={loading}
                required
                className="w-full bg-[#F5F2EB] border border-[#171717]/30 px-4 py-3.5 text-sm text-[#171717] placeholder:text-[#B8B5AE] focus:outline-none focus:border-[#171717] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="reg-instagram"
                className="block text-xs font-mono uppercase tracking-wider text-[#171717]"
              >
                Instagram Username <span className="text-[#B8B5AE] text-[10px]">(Optional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-[#B8B5AE] text-sm font-mono">@</span>
                <input
                  id="reg-instagram"
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="username"
                  disabled={loading}
                  className="w-full bg-[#F5F2EB] border border-[#171717]/30 pl-9 pr-4 py-3.5 text-sm text-[#171717] placeholder:text-[#B8B5AE] focus:outline-none focus:border-[#171717] transition-colors"
                />
              </div>
            </div>

            {/* Notifications / State Feedback */}
            {status === "success" && (
              <div className="p-4 bg-[#777A61]/15 border border-[#777A61] text-[#171717] text-xs flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#777A61] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold uppercase tracking-wider">Confirmed</p>
                  <p>{message}</p>
                </div>
              </div>
            )}

            {status === "exists" && (
              <div className="p-4 bg-[#B8B5AE]/20 border border-[#B8B5AE] text-[#171717] text-xs flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold uppercase tracking-wider">Already on the list</p>
                  <p>{message}</p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="p-4 bg-red-500/10 border border-red-500/40 text-[#171717] text-xs flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold uppercase tracking-wider text-red-700">Notice</p>
                  <p>{message}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#171717] hover:bg-[#777A61] text-[#F5F2EB] text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>SECURING ACCESS...</span>
                </>
              ) : (
                <>
                  <span>GET ON THE LIST</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Privacy notice and business clarification */}
            <div className="pt-2 text-center text-[11px] text-[#171717]/60 leading-relaxed">
              <p>
                This is a launch-interest registration, not a purchase or confirmed preorder.
                We will never charge your card or sell your data. View our{" "}
                <a href="#privacy" className="underline hover:text-[#171717]">
                  Privacy Notice
                </a>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
