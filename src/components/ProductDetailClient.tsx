"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SizeChartModal } from "@/components/SizeChartModal";
import { ProductConcept } from "@/lib/products";
import {
  ArrowLeft,
  Ruler,
  CheckCircle2,
  Loader2,
  ZoomIn,
  X,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

interface ProductDetailClientProps {
  product: ProductConcept;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  // State management
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedView, setSelectedView] = useState<"model" | "flat" | "detail">("model");
  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L" | "XL" | "XXL">("L");
  const [quantity, setQuantity] = useState(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  // Interest Registration Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [referralSource, setReferralSource] = useState("website_product_page");
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    registrationId?: string;
    message?: string;
    alreadyRegistered?: boolean;
    error?: string;
  } | null>(null);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];

  // Resolve current active image url
  let activeImageUrl = activeColor.images.model;
  if (selectedView === "flat" && activeColor.images.flat) {
    activeImageUrl = activeColor.images.flat;
  } else if (selectedView === "detail" && activeColor.images.detail) {
    activeImageUrl = activeColor.images.detail;
  }

  const handleInterestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitResult(null);

    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          productName: product.name,
          colour: activeColor.name,
          size: selectedSize,
          quantity: quantity,
          referralSource,
          consent,
          honeypot,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitResult({
          success: true,
          registrationId: data.registrationId,
          message: data.message,
          alreadyRegistered: data.alreadyRegistered,
        });
      } else {
        setSubmitResult({
          success: false,
          error: data.error || "Failed to register interest. Please try again.",
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        error: "Network error. Please check your connection.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-8 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#777A61]">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 hover:text-[#171717] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Collection Zero</span>
            </Link>
            <span>PLANNED LAUNCH: 31.12.2026</span>
          </div>

          {/* Product Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left 7 Columns: Product Gallery */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main Showcase Frame */}
              <div className="relative aspect-square w-full bg-[#FFFFFF] border border-[#171717] overflow-hidden shadow-[8px_8px_0px_0px_#171717]">
                <Image
                  src={activeImageUrl}
                  alt={`${product.name} - ${activeColor.name} (${selectedView} view)`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain p-2 sm:p-4 transition-transform duration-300"
                />

                {/* Top Overlay Badge */}
                <div className="absolute top-4 left-4 bg-[#171717] text-[#F5F2EB] px-3 py-1 text-[10px] font-mono uppercase tracking-widest">
                  {product.conceptNumber}
                </div>

                {/* Click to Zoom Button */}
                <button
                  type="button"
                  onClick={() => setZoomImage(activeImageUrl)}
                  className="absolute bottom-4 right-4 bg-[#F5F2EB] border border-[#171717] p-2.5 text-[#171717] hover:bg-[#171717] hover:text-[#F5F2EB] transition-colors flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider cursor-pointer"
                  title="Click to Zoom High-Res"
                >
                  <ZoomIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Zoom</span>
                </button>
              </div>

              {/* View Switcher Tabs (Model View / Flat Lay / Detail) */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedView("model")}
                  className={`flex-1 py-2.5 px-3 border text-xs font-mono uppercase tracking-wider text-center transition-all cursor-pointer ${
                    selectedView === "model"
                      ? "bg-[#171717] text-[#F5F2EB] border-[#171717]"
                      : "bg-[#FFFFFF] text-[#171717] border-[#171717]/30 hover:border-[#171717]"
                  }`}
                >
                  Model View
                </button>

                {activeColor.images.flat && (
                  <button
                    type="button"
                    onClick={() => setSelectedView("flat")}
                    className={`flex-1 py-2.5 px-3 border text-xs font-mono uppercase tracking-wider text-center transition-all cursor-pointer ${
                      selectedView === "flat"
                        ? "bg-[#171717] text-[#F5F2EB] border-[#171717]"
                        : "bg-[#FFFFFF] text-[#171717] border-[#171717]/30 hover:border-[#171717]"
                    }`}
                  >
                    Flat Lay
                  </button>
                )}

                {activeColor.images.detail && (
                  <button
                    type="button"
                    onClick={() => setSelectedView("detail")}
                    className={`flex-1 py-2.5 px-3 border text-xs font-mono uppercase tracking-wider text-center transition-all cursor-pointer ${
                      selectedView === "detail"
                        ? "bg-[#171717] text-[#F5F2EB] border-[#171717]"
                        : "bg-[#FFFFFF] text-[#171717] border-[#171717]/30 hover:border-[#171717]"
                    }`}
                  >
                    Print Detail
                  </button>
                )}
              </div>

              {/* Development & IP Disclaimer Strip */}
              <div className="p-4 bg-[#FFFFFF] border border-[#171717]/15 text-xs text-[#171717]/80 space-y-2">
                <div className="flex items-center gap-2 font-mono uppercase tracking-wider text-[11px] text-[#777A61]">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Prototype Status Notice</span>
                </div>
                <p className="leading-relaxed">
                  {product.developmentStatus}
                </p>
                <p className="text-[11px] font-mono text-[#777A61]">
                  IP Assessment: {product.ipStatus}
                </p>
              </div>
            </div>

            {/* Right 5 Columns: Product Info & Interest Registration */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#777A61] block mb-2">
                  {product.fit}
                </span>
                <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)] mb-3">
                  {product.name}
                </h1>
                <p className="text-sm text-[#171717]/80 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Price Display */}
                <div className="pb-6 border-b border-[#171717]/15">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-[#171717]">
                      ₹{product.launchPrice}
                    </span>
                    <span className="text-sm font-mono text-[#171717]/50 line-through">
                      MRP ₹{product.mrp}
                    </span>
                    <span className="px-2 py-0.5 bg-[#777A61]/15 text-[#777A61] text-[10px] font-mono uppercase tracking-wider font-bold">
                      Planned Launch Target
                    </span>
                  </div>
                  <p className="text-[11px] text-[#171717]/60 mt-1">
                    Free interest registration. No payment collected now.
                  </p>
                </div>

                {/* Color Selection */}
                <div className="py-6 border-b border-[#171717]/15 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider">
                    <span className="text-[#171717]/70">Colourway:</span>
                    <span className="font-bold text-[#171717]">{activeColor.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color, idx) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => {
                          setSelectedColorIndex(idx);
                        }}
                        className={`flex items-center gap-2 px-3 py-2 border text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                          selectedColorIndex === idx
                            ? "border-[#171717] bg-[#FFFFFF] shadow-[2px_2px_0px_0px_#171717]"
                            : "border-[#171717]/30 bg-[#F5F2EB] hover:border-[#171717]"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/30 inline-block"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="py-6 border-b border-[#171717]/15 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider">
                    <span className="text-[#171717]/70">Size Preference:</span>
                    <button
                      type="button"
                      onClick={() => setIsSizeChartOpen(true)}
                      className="text-[#777A61] hover:text-[#171717] inline-flex items-center gap-1 font-semibold underline underline-offset-2 cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                          selectedSize === size
                            ? "bg-[#171717] text-[#F5F2EB] border border-[#171717]"
                            : "bg-[#FFFFFF] text-[#171717] border border-[#171717]/30 hover:border-[#171717]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="py-6 border-b border-[#171717]/15 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#171717]/70">
                    Requested Quantity:
                  </span>
                  <div className="flex items-center border border-[#171717] bg-[#FFFFFF]">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 hover:bg-[#F5F2EB] font-mono text-sm cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 font-mono text-sm font-bold">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(5, quantity + 1))}
                      className="px-3 py-1.5 hover:bg-[#F5F2EB] font-mono text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary CTA: Register Interest */}
                <div className="pt-6">
                  {!isFormOpen ? (
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(true)}
                      className="w-full py-4 bg-[#171717] hover:bg-[#777A61] text-[#F5F2EB] text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_#777A61]"
                    >
                      <span>REGISTER INTEREST — NO PAYMENT</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    /* Embedded Registration Form */
                    <div className="bg-[#FFFFFF] border border-[#171717] p-5 sm:p-6 shadow-[6px_6px_0px_0px_#171717] space-y-4">
                      <div className="flex items-center justify-between border-b border-[#171717]/15 pb-3">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#777A61]">
                            PRIORITY DROP LIST
                          </span>
                          <h3 className="text-sm font-bold uppercase tracking-tight text-[#171717]">
                            Confirm Interest in {product.name}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsFormOpen(false)}
                          className="text-[#171717]/50 hover:text-[#171717] p-1 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {submitResult?.success ? (
                        <div className="p-4 bg-emerald-50 border border-emerald-500 text-xs text-emerald-950 space-y-2">
                          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-emerald-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>You&apos;re on the AFTERCLASS List</span>
                          </div>
                          <p>
                            Registration ID:{" "}
                            <strong className="font-mono">{submitResult.registrationId}</strong>
                          </p>
                          <p className="text-[11px] text-emerald-800/80">
                            We recorded your interest for <strong>{product.name}</strong> ({activeColor.name}, Size {selectedSize}, Qty {quantity}).
                            You will receive launch updates before December 31, 2026.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleInterestSubmit} className="space-y-4">
                          {/* Honeypot hidden input */}
                          <input
                            type="text"
                            name="website"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                            className="hidden"
                            tabIndex={-1}
                            autoComplete="off"
                          />

                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#171717] mb-1">
                              Your Full Name <span className="text-[#777A61]">*</span>
                            </label>
                            <input
                              type="text"
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                              placeholder="e.g. Alex Sharma"
                              required
                              className="w-full bg-[#F5F2EB] border border-[#171717]/30 px-3 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#171717] mb-1">
                              Email Address <span className="text-[#777A61]">*</span>
                            </label>
                            <input
                              type="email"
                              value={customerEmail}
                              onChange={(e) => setCustomerEmail(e.target.value)}
                              placeholder="alex@domain.com"
                              required
                              className="w-full bg-[#F5F2EB] border border-[#171717]/30 px-3 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#171717] mb-1">
                              Phone / WhatsApp <span className="text-[#B8B5AE] text-[10px]">(Optional for SMS Drop Alert)</span>
                            </label>
                            <input
                              type="tel"
                              value={customerPhone}
                              onChange={(e) => setCustomerPhone(e.target.value)}
                              placeholder="10-digit mobile number"
                              className="w-full bg-[#F5F2EB] border border-[#171717]/30 px-3 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#171717] mb-1">
                              How did you discover AFTERCLASS?
                            </label>
                            <select
                              value={referralSource}
                              onChange={(e) => setReferralSource(e.target.value)}
                              className="w-full bg-[#F5F2EB] border border-[#171717]/30 px-3 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                            >
                              <option value="website_product_page">Direct / Website</option>
                              <option value="instagram">Instagram</option>
                              <option value="friend_referral">Friend / Word of Mouth</option>
                              <option value="campus_community">College / Campus</option>
                              <option value="reddit_streetwear">Reddit / Online Community</option>
                              <option value="other">Other</option>
                            </select>
                          </div>

                          {/* Consent */}
                          <label className="flex items-start gap-2 pt-1 text-[11px] text-[#171717]/80 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={consent}
                              onChange={(e) => setConsent(e.target.checked)}
                              required
                              className="mt-0.5 accent-[#171717]"
                            />
                            <span>
                              I agree to receive pre-launch notifications from AFTERCLASS. This is a free interest registration, not a payment or reserved order.
                            </span>
                          </label>

                          {submitResult?.error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/40 text-red-700 text-xs">
                              {submitResult.error}
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-3.5 bg-[#171717] hover:bg-[#777A61] text-[#F5F2EB] text-xs font-bold uppercase tracking-[0.2em] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            {submitting ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>RECORDING INTEREST...</span>
                              </>
                            ) : (
                              <span>CONFIRM FREE REGISTRATION</span>
                            )}
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-center gap-4 text-[11px] font-mono text-[#777A61]">
                    <span>✓ ZERO PAYMENT REQUIRED</span>
                    <span>•</span>
                    <span>✓ FREE PRIORITY STATUS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Click-to-Zoom Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-[#171717]/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setZoomImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={zoomImage}
              alt="Zoomed Detail"
              fill
              className="object-contain"
            />
            <button
              type="button"
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 bg-[#F5F2EB] text-[#171717] p-2 hover:bg-[#777A61] hover:text-[#F5F2EB] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        selectedSize={selectedSize}
        onSelectSize={(s) => setSelectedSize(s as "S" | "M" | "L" | "XL" | "XXL")}
      />
    </>
  );
}
