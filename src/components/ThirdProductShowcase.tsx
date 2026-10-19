"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Ruler,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Bell,
  Heart,
  Share2,
  Sparkles,
  ZoomIn,
  X,
} from "lucide-react";
import { SizeChartModal } from "@/components/SizeChartModal";

interface ColorVariant {
  name: string;
  code: string;
  label: string;
  hangerImage: string;
  modelImage: string;
}

const COLOR_VARIANTS: ColorVariant[] = [
  {
    name: "Washed Black",
    code: "#171717",
    label: "Washed Black",
    hangerImage: "/images/coffee_v3_black_hanger.jpg",
    modelImage: "/images/coffee_v3_black_model.jpg",
  },
  {
    name: "Off-White",
    code: "#F5F2EB",
    label: "Warm Off-White",
    hangerImage: "/images/coffee_v3_white_hanger.jpg",
    modelImage: "/images/coffee_v3_white_model.jpg",
  },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export function ThirdProductShowcase() {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(COLOR_VARIANTS[0]);
  const [activeImage, setActiveImage] = useState<"hanger" | "model">("model");
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState<string | null>(null);

  // Interest Modal / Form state
  const [isInterestedOpen, setIsInterestedOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const currentImageUrl =
    activeImage === "model" ? selectedColor.modelImage : selectedColor.hangerImage;

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode.trim())) {
      setDeliveryMessage("✓ Express Priority Delivery available for " + pincode + " upon official drop.");
    } else {
      setDeliveryMessage("Please enter a valid 6-digit Indian PIN code.");
    }
  };

  const handleInterestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus("idle");
    setFeedbackMessage("");

    if (!name.trim()) {
      setFormStatus("error");
      setFeedbackMessage("Please enter your name.");
      setLoading(false);
      return;
    }

    const cleanMobile = mobile.replace(/\D/g, "");
    if (cleanMobile.length < 10) {
      setFormStatus("error");
      setFeedbackMessage("Please enter a valid 10-digit mobile number for launch alerts.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          mobile: cleanMobile,
          email: email.trim() || undefined,
          city: city.trim() || undefined,
          productName: "“BUT FIRST COFFEE” Heavyweight Boxy Tee",
          color: selectedColor.name,
          size: selectedSize,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setFormStatus("error");
        setFeedbackMessage(data.error || "Submission failed. Please try again.");
      } else {
        setFormStatus("success");
        setFeedbackMessage(
          `Priority secured! We'll alert you on WhatsApp (${cleanMobile}) with your exclusive 10% OFF discount coupon (₹629 final price) the moment the “BUT FIRST COFFEE” Tee in ${selectedColor.name} (Size ${selectedSize}) drops.`
        );
      }
    } catch {
      setFormStatus("error");
      setFeedbackMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="product-coffee" className="py-16 sm:py-24 bg-[#F5F2EB] border-b border-[#171717]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Amazon/Flipkart Breadcrumb navigation style */}
        <div className="flex items-center space-x-2 text-xs uppercase font-mono tracking-wider text-[#171717]/60 mb-8 overflow-x-auto whitespace-nowrap">
          <span>Home</span>
          <span>/</span>
          <span>Drop 01 Catalogue</span>
          <span>/</span>
          <span>Minimalist Streetwear Series</span>
          <span>/</span>
          <span className="text-[#171717] font-bold">“BUT FIRST COFFEE” Graphic Tee</span>
        </div>

        {/* E-Commerce Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT: Image Gallery & Thumbnails (Model & Product) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Gallery Thumbnails */}
            <div className="flex sm:flex-col gap-3 shrink-0">
              {/* Model Thumbnail */}
              <button
                type="button"
                onClick={() => setActiveImage("model")}
                className={`relative w-20 h-24 sm:w-24 sm:h-28 border-2 transition-all overflow-hidden ${
                  activeImage === "model"
                    ? "border-[#171717] ring-2 ring-[#171717]/20"
                    : "border-[#171717]/20 hover:border-[#171717]/50"
                }`}
              >
                <Image
                  src={selectedColor.modelImage}
                  alt={`${selectedColor.name} On Model`}
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-[#171717]/80 text-[#F5F2EB] text-[9px] font-mono py-0.5 text-center">
                  ON MODEL
                </span>
              </button>

              {/* Hanger Thumbnail */}
              <button
                type="button"
                onClick={() => setActiveImage("hanger")}
                className={`relative w-20 h-24 sm:w-24 sm:h-28 border-2 transition-all overflow-hidden ${
                  activeImage === "hanger"
                    ? "border-[#171717] ring-2 ring-[#171717]/20"
                    : "border-[#171717]/20 hover:border-[#171717]/50"
                }`}
              >
                <Image
                  src={selectedColor.hangerImage}
                  alt={`${selectedColor.name} On Hanger`}
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-[#171717]/80 text-[#F5F2EB] text-[9px] font-mono py-0.5 text-center">
                  PRODUCT
                </span>
              </button>
            </div>

            {/* Main Interactive Display Image - Clean Seamless Frame with Click-to-Zoom */}
            <div
              onClick={() => setIsZoomOpen(true)}
              className="relative aspect-square w-full bg-[#171717] border-2 border-[#171717] overflow-hidden shadow-[10px_10px_0px_0px_rgba(23,23,23,0.1)] group cursor-zoom-in"
              title="Click to zoom image"
            >
              <Image
                src={currentImageUrl}
                alt={`AFTERCLASS BUT FIRST COFFEE Tee in ${selectedColor.name}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-2 sm:p-3 transition-transform duration-500 ease-out group-hover:scale-105"
              />

              <div className="absolute top-4 left-4 bg-[#171717]/85 backdrop-blur-xs text-[#F5F2EB] px-3 py-1 text-[10px] font-mono tracking-widest uppercase border border-[#F5F2EB]/10 z-10">
                DROP 01 // EDITION 03
              </div>

              {/* Click to Zoom indicator tag */}
              <div className="absolute top-4 right-4 bg-[#171717]/85 backdrop-blur-xs text-[#F5F2EB] px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase border border-[#F5F2EB]/10 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity z-10">
                <ZoomIn className="w-3.5 h-3.5 text-[#777A61]" />
                <span>CLICK TO ZOOM</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-[#171717]/90 backdrop-blur-xs text-[#F5F2EB] p-3 text-[11px] font-mono tracking-wider flex items-center justify-between border border-[#F5F2EB]/15 z-10">
                <span className="flex items-center gap-1.5 text-[#F5F2EB]">
                  <Sparkles className="w-3.5 h-3.5 text-[#777A61]" />
                  LIMITED RUN: 200 PIECES
                </span>
                <span className="text-[#B8B5AE]">GSM: 290 G</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Buying / Interest Panel */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777A61] font-semibold">
                  AFTERCLASS ATELIER // COFFEE ARCHIVE
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsInterestedOpen(true)}
                    className="p-1.5 text-[#171717] hover:text-[#777A61] transition-colors"
                    title="Save to Wishlist"
                    aria-label="Save to Wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: "AFTERCLASS — “BUT FIRST COFFEE” Tee",
                          url: window.location.href,
                        });
                      }
                    }}
                    className="p-1.5 text-[#171717] hover:text-[#777A61] transition-colors"
                    title="Share product"
                    aria-label="Share product"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)] mb-2">
                &ldquo;BUT FIRST COFFEE&rdquo; Heavyweight Tee
              </h2>

              {/* Flipkart/Amazon Style Ratings & Assurance */}
              <div className="flex items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1 bg-[#171717] text-[#F5F2EB] px-2 py-0.5 font-bold font-mono text-[10px]">
                  4.98 <Star className="w-2.5 h-2.5 fill-current text-[#777A61]" />
                </span>
                <span className="text-[#171717]/70 underline cursor-pointer">
                  210 Verified Lookbook Upvotes
                </span>
                <span className="text-[#777A61] font-mono">• AFTERCLASS ASSURED</span>
              </div>
            </div>

            {/* Pricing Section (Amazon/Flipkart layout) */}
            <div className="p-4 bg-[#FFFFFF] border border-[#171717]/20 shadow-xs">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-mono">
                  ₹699
                </span>
                <span className="text-sm line-through text-[#171717]/40 font-mono">
                  ₹1,499
                </span>
                <span className="text-xs font-bold text-red-600 font-mono tracking-wider">
                  53% OFF (LAUNCH PRICE)
                </span>
              </div>
              
              {/* Special 10% Discount Badge for Interested Users */}
              <div className="mt-2.5 p-2 bg-[#777A61]/15 border border-[#777A61] flex items-center justify-between text-xs">
                <span className="font-bold text-[#171717] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-[#777A61]" />
                  INTERESTED BUYERS GET EXTRA 10% OFF
                </span>
                <span className="font-mono font-bold text-[#777A61]">
                  EFFECTIVE: ₹629
                </span>
              </div>

              <p className="text-[11px] text-[#777A61] mt-2 font-mono">
                Inclusive of all taxes • Exclusive ₹70 coupon code sent via WhatsApp on Drop
              </p>
            </div>

            {/* Color Swatch Selection */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#171717]">
                  Color: <strong className="text-[#171717]">{selectedColor.label}</strong>
                </span>
                <span className="text-[11px] font-mono text-[#777A61]">2 Colorways</span>
              </div>
              <div className="flex items-center gap-3">
                {COLOR_VARIANTS.map((variant) => (
                  <button
                    key={variant.name}
                    type="button"
                    onClick={() => {
                      setSelectedColor(variant);
                    }}
                    className={`group flex items-center gap-2.5 px-3 py-2 border-2 transition-all ${
                      selectedColor.name === variant.name
                        ? "border-[#171717] bg-[#FFFFFF] shadow-xs"
                        : "border-[#171717]/20 hover:border-[#171717]/60 bg-[#F5F2EB]"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/30"
                      style={{ backgroundColor: variant.code }}
                    />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                      {variant.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection & Universal Size Chart Trigger */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#171717]">
                  Select Size: <strong>{selectedSize}</strong>
                </span>
                {/* Size Chart Trigger */}
                <button
                  type="button"
                  onClick={() => setIsSizeChartOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#171717] hover:text-[#777A61] underline transition-colors cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#777A61]" />
                  Size Chart & Fit Guide
                </button>
              </div>

              {/* Size Buttons */}
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] py-2.5 px-3 text-xs font-bold uppercase font-mono tracking-wider transition-all cursor-pointer ${
                      selectedSize === size
                        ? "bg-[#171717] text-[#F5F2EB] border-2 border-[#171717] shadow-xs"
                        : "bg-[#FFFFFF] text-[#171717] border border-[#171717]/30 hover:border-[#171717]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-[#171717]/60">
                Fit: Oversized Boxy silhouette with 290 GSM combed cotton and double-needle hem.
              </p>
            </div>

            {/* PRIMARY E-COMMERCE ACTION */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={() => setIsInterestedOpen(true)}
                className="w-full py-4 px-6 bg-[#171717] hover:bg-[#777A61] text-[#F5F2EB] text-sm font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_#777A61] cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span>I&apos;M INTERESTED — SECURE PRIORITY DROP</span>
              </button>

              <p className="text-[11px] text-center text-[#171717]/60 font-mono">
                No upfront payment required. 10% coupon code unlocked directly on WhatsApp.
              </p>
            </div>

            {/* Amazon/Flipkart Delivery Pincode Checker */}
            <div className="p-4 bg-[#FFFFFF] border border-[#171717]/20 space-y-2">
              <span className="block text-xs font-mono uppercase tracking-wider text-[#171717] font-semibold">
                Delivery Availability Check
              </span>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit PIN code"
                  className="flex-1 bg-[#F5F2EB] border border-[#171717]/30 px-3 py-2 text-xs font-mono placeholder:text-[#B8B5AE] focus:outline-none focus:border-[#171717]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#171717] text-[#F5F2EB] text-xs font-bold uppercase tracking-wider hover:bg-[#777A61] transition-colors"
                >
                  Check
                </button>
              </form>
              {deliveryMessage && (
                <p className="text-[11px] font-mono text-[#777A61] pt-1">
                  {deliveryMessage}
                </p>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-[11px] text-[#171717]/80 font-mono">
              <div className="flex items-center gap-1.5 p-2 bg-white/70 border border-[#171717]/10">
                <ShieldCheck className="w-4 h-4 text-[#777A61] shrink-0" />
                <span>100% Combed Cotton</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-white/70 border border-[#171717]/10">
                <Truck className="w-4 h-4 text-[#777A61] shrink-0" />
                <span>Pan-India Express</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-white/70 border border-[#171717]/10">
                <RotateCcw className="w-4 h-4 text-[#777A61] shrink-0" />
                <span>7-Day Exchange</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP / MODAL: "I'M INTERESTED" LEAD CAPTURE MODAL */}
      {isInterestedOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#FFFFFF] border-2 border-[#171717] p-6 sm:p-8 shadow-[12px_12px_0px_0px_#171717]">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#171717]/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#777A61] block mb-1">
                  PRIORITY NOTIFY LIST // BUT FIRST COFFEE TEE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                  REGISTER YOUR INTEREST
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsInterestedOpen(false);
                  setFormStatus("idle");
                }}
                className="p-1.5 text-[#171717] hover:bg-[#F5F2EB] border border-[#171717]/20 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Selected Spec Overview */}
            <div className="p-3 bg-[#F5F2EB] border border-[#171717]/15 mb-6 text-xs flex justify-between items-center font-mono">
              <div>
                <span className="font-bold text-[#171717] block">“BUT FIRST COFFEE” Tee</span>
                <span className="text-[#777A61]">
                  Color: {selectedColor.name} | Size: {selectedSize}
                </span>
                <span className="text-[10px] text-green-700 font-bold block mt-0.5">
                  ✓ 10% Early Bird Discount Applied: Pay ₹629 on Drop
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs line-through text-[#171717]/40 block">₹699</span>
                <span className="text-sm font-extrabold text-[#171717]">₹629</span>
              </div>
            </div>

            {formStatus === "success" ? (
              <div className="space-y-4 py-4 text-center">
                <div className="w-12 h-12 bg-[#777A61]/20 border border-[#777A61] rounded-full flex items-center justify-center mx-auto text-[#777A61]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold uppercase tracking-tight text-[#171717]">
                  Priority Access Locked In!
                </h4>
                <p className="text-xs text-[#171717]/80 leading-relaxed font-mono">
                  {feedbackMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setIsInterestedOpen(false)}
                  className="mt-4 px-6 py-3 bg-[#171717] text-[#F5F2EB] text-xs font-bold uppercase tracking-wider hover:bg-[#777A61] transition-colors"
                >
                  Back to Lookbook
                </button>
              </div>
            ) : (
              <form onSubmit={handleInterestSubmit} className="space-y-4">
                {formStatus === "error" && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label
                    htmlFor="coffee-name"
                    className="block text-xs font-mono uppercase tracking-wider text-[#171717]"
                  >
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="coffee-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rohini Roy"
                    className="w-full bg-[#F5F2EB] border border-[#171717]/30 px-3.5 py-2.5 text-xs text-[#171717] placeholder:text-[#B8B5AE] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="coffee-mobile"
                    className="block text-xs font-mono uppercase tracking-wider text-[#171717]"
                  >
                    Mobile / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-mono text-[#171717]/60">
                      +91
                    </span>
                    <input
                      id="coffee-mobile"
                      type="tel"
                      required
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="9876543210"
                      className="w-full bg-[#F5F2EB] border border-[#171717]/30 pl-12 pr-3.5 py-2.5 text-xs text-[#171717] placeholder:text-[#B8B5AE] focus:outline-none focus:border-[#171717] font-mono"
                    />
                  </div>
                  <span className="text-[10px] text-[#777A61] font-mono">
                    Instant alert sent when sizes open. No spam.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label
                      htmlFor="coffee-email"
                      className="block text-xs font-mono uppercase tracking-wider text-[#171717]"
                    >
                      Email Address
                    </label>
                    <input
                      id="coffee-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full bg-[#F5F2EB] border border-[#171717]/30 px-3 py-2.5 text-xs text-[#171717] placeholder:text-[#B8B5AE] focus:outline-none focus:border-[#171717]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="coffee-city"
                      className="block text-xs font-mono uppercase tracking-wider text-[#171717]"
                    >
                      City / State
                    </label>
                    <input
                      id="coffee-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Kolkata, Chandigarh"
                      className="w-full bg-[#F5F2EB] border border-[#171717]/30 px-3 py-2.5 text-xs text-[#171717] placeholder:text-[#B8B5AE] focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#171717] hover:bg-[#777A61] text-[#F5F2EB] text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>RESERVING NOTIFICATION SPOT...</span>
                      </>
                    ) : (
                      <>
                        <span>NOTIFY ME ON DROP (10% OFF LOCKED)</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Official Universal Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        selectedSize={selectedSize}
        onSelectSize={(size) => setSelectedSize(size)}
      />

      {/* High-Resolution Click to Zoom Lightbox Modal */}
      {isZoomOpen && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center bg-[#171717] border-2 border-[#F5F2EB]/20 p-4 shadow-2xl"
          >
            <div className="w-full flex items-center justify-between pb-3 border-b border-[#F5F2EB]/15 text-[#F5F2EB] mb-3">
              <span className="text-xs font-mono tracking-widest uppercase text-[#777A61]">
                {selectedColor.name} // {activeImage === "model" ? "LOOKBOOK FIT" : "PRODUCT DETAIL"} (ZOOM VIEW)
              </span>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="p-1 hover:bg-white/10 text-[#F5F2EB] transition-colors"
                aria-label="Close zoom preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full aspect-square max-h-[80vh] overflow-hidden bg-black flex items-center justify-center">
              <Image
                src={currentImageUrl}
                alt={`${selectedColor.name} Zoomed`}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="w-full pt-3 flex items-center justify-between text-[11px] font-mono text-[#B8B5AE] border-t border-[#F5F2EB]/10 mt-3">
              <span>AFTERCLASS ATELIER // 100% COMBED COTTON</span>
              <span>CLICK OUTSIDE OR &apos;ESC&apos; TO EXIT</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
