"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Ruler,
  Star,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Bell,
  Heart,
  Share2,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { SizeChartModal } from "@/components/SizeChartModal";

export interface ProductItem {
  id: string;
  tag: string;
  title: string;
  edition: string;
  rating: string;
  reviews: string;
  price: number;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: string;
  gsm: string;
  description: string;
  variants: {
    name: string;
    code: string;
    label: string;
    hangerImage: string;
    modelImage: string;
  }[];
}

const PRODUCTS: ProductItem[] = [
  {
    id: "diet-coke",
    tag: "01 // HERO ARCHIVE",
    title: "“On a Diet (Coke)” Heavyweight Tee",
    edition: "EDITION 01",
    rating: "4.9",
    reviews: "148 early reviews",
    price: 699,
    originalPrice: 1499,
    discountPrice: 629,
    discountPercentage: "53% OFF",
    gsm: "280–300 GSM",
    description: "Signature boxy cut in heavy 280-300 GSM combed cotton featuring minimalist chest typography and thick 1.25\" collar.",
    variants: [
      {
        name: "Washed Black",
        code: "#171717",
        label: "Washed Black",
        hangerImage: "/images/diet_coke_black_hanger.jpg",
        modelImage: "/images/diet_coke_black_model.jpg",
      },
      {
        name: "Off-White",
        code: "#F5F2EB",
        label: "Warm Off-White",
        hangerImage: "/images/diet_coke_white_hanger.jpg",
        modelImage: "/images/diet_coke_white_model.jpg",
      },
    ],
  },
  {
    id: "wasted",
    tag: "02 // POP-ART SERIES",
    title: "“WASTED” Heavyweight Tee",
    edition: "EDITION 02",
    rating: "4.95",
    reviews: "182 early requests",
    price: 699,
    originalPrice: 1499,
    discountPrice: 629,
    discountPercentage: "53% OFF",
    gsm: "290 GSM",
    description: "Slanted retro pop-art graphic patch in electric yellow & blue, dropped shoulders, and reinforced double-needle hem.",
    variants: [
      {
        name: "Washed Black",
        code: "#171717",
        label: "Washed Black",
        hangerImage: "/images/wasted_black_hanger.jpg",
        modelImage: "/images/wasted_black_model.jpg",
      },
      {
        name: "Off-White",
        code: "#F5F2EB",
        label: "Warm Off-White",
        hangerImage: "/images/wasted_white_hanger.jpg",
        modelImage: "/images/wasted_white_model.jpg",
      },
    ],
  },
  {
    id: "coffee",
    tag: "03 // MINIMALIST ARCHIVE",
    title: "“BUT FIRST COFFEE” Heavyweight Tee",
    edition: "EDITION 03",
    rating: "4.98",
    reviews: "210 early upvotes",
    price: 699,
    originalPrice: 1499,
    discountPrice: 629,
    discountPercentage: "53% OFF",
    gsm: "290 GSM",
    description: "Understated chest illustration with takeaway coffee cup motif, 100% long-staple combed cotton, and relaxed boxy drape.",
    variants: [
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
    ],
  },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export function CuratedDropShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const currentProduct = PRODUCTS[activeTab];

  // Selected state per product
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeView, setActiveView] = useState<"model" | "hanger">("model");
  const [selectedSize, setSelectedSize] = useState("L");
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  // Interest Modal
  const [isInterestedOpen, setIsInterestedOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const currentColor = currentProduct.variants[selectedColorIdx] || currentProduct.variants[0];
  const activeImage =
    activeView === "model" ? currentColor.modelImage : currentColor.hangerImage;

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
          productName: currentProduct.title,
          color: currentColor.name,
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
          `Priority secured! We'll alert you on WhatsApp (${cleanMobile}) with your exclusive 10% OFF discount coupon (₹629 final price) the moment ${currentProduct.title} (${currentColor.name}, Size ${selectedSize}) drops.`
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
    <section id="drop" className="py-20 sm:py-28 bg-[#F5F2EB] border-b border-[#171717]/15">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header with generous whitespace */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#171717]/10 pb-6 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#777A61] block mb-2">
              EXCLUSIVE DROP 01 // PREVIEW & PRIORITY
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
              FEATURED DESIGNS
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-wider text-[#171717]/60 max-w-sm">
            Launch Price ₹699 • Interested buyers lock in an extra 10% off (₹629). No upfront payment.
          </p>
        </div>

        {/* Clean Editorial Product Navigation Bar (3 Distinct Tabs) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {PRODUCTS.map((prod, idx) => (
            <button
              key={prod.id}
              type="button"
              onClick={() => {
                setActiveTab(idx);
                setSelectedColorIdx(0);
                setActiveView("model");
              }}
              className={`p-4 text-left border-2 transition-all cursor-pointer ${
                activeTab === idx
                  ? "bg-[#171717] text-[#F5F2EB] border-[#171717] shadow-sm"
                  : "bg-white text-[#171717] border-[#171717]/15 hover:border-[#171717]/50"
              }`}
            >
              <span
                className={`text-[10px] font-mono tracking-widest uppercase block mb-1 ${
                  activeTab === idx ? "text-[#777A61]" : "text-[#777A61]"
                }`}
              >
                {prod.tag}
              </span>
              <span className="text-sm sm:text-base font-bold uppercase tracking-tight block truncate">
                {prod.title.replace(/“|”/g, "")}
              </span>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-current/15 text-xs font-mono">
                <span>₹{prod.price}</span>
                <span className={activeTab === idx ? "text-[#B8B5AE]" : "text-[#777A61]"}>
                  10% OFF: ₹{prod.discountPrice}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Focused, Spacious E-Commerce Showcase for Active Product */}
        <div className="bg-white border-2 border-[#171717] p-6 sm:p-10 shadow-[10px_10px_0px_0px_rgba(23,23,23,0.1)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT: Image Gallery (6 Cols on LG) */}
            <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex sm:flex-col gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveView("model")}
                  className={`relative w-20 h-24 sm:w-22 sm:h-26 border-2 transition-all overflow-hidden ${
                    activeView === "model"
                      ? "border-[#171717] ring-2 ring-[#171717]/20"
                      : "border-[#171717]/20 hover:border-[#171717]/50"
                  }`}
                >
                  <Image
                    src={currentColor.modelImage}
                    alt={`${currentColor.name} On Model`}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-[#171717]/85 text-[#F5F2EB] text-[8px] font-mono py-0.5 text-center">
                    ON MODEL
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveView("hanger")}
                  className={`relative w-20 h-24 sm:w-22 sm:h-26 border-2 transition-all overflow-hidden ${
                    activeView === "hanger"
                      ? "border-[#171717] ring-2 ring-[#171717]/20"
                      : "border-[#171717]/20 hover:border-[#171717]/50"
                  }`}
                >
                  <Image
                    src={currentColor.hangerImage}
                    alt={`${currentColor.name} On Hanger`}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-[#171717]/85 text-[#F5F2EB] text-[8px] font-mono py-0.5 text-center">
                    PRODUCT
                  </span>
                </button>
              </div>

              {/* Main Image */}
              <div className="relative aspect-square w-full bg-[#171717] border-2 border-[#171717] overflow-hidden group">
                <Image
                  src={activeImage}
                  alt={`${currentProduct.title} in ${currentColor.name}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-2 sm:p-3 transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <div className="absolute top-3 left-3 bg-[#171717]/85 backdrop-blur-xs text-[#F5F2EB] px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase border border-[#F5F2EB]/15 z-10">
                  {currentProduct.edition} // {activeView === "model" ? "LOOKBOOK" : "FLAT LAY"}
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-[#171717]/90 backdrop-blur-xs text-[#F5F2EB] px-3 py-2 text-[10px] font-mono tracking-wider flex items-center justify-between border border-[#F5F2EB]/15 z-10">
                  <span className="flex items-center gap-1.5 text-[#F5F2EB]">
                    <Sparkles className="w-3.5 h-3.5 text-[#777A61]" />
                    LIMITED RUN: 200 PIECES
                  </span>
                  <span className="text-[#B8B5AE]">{currentProduct.gsm}</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Product Specs & Action (6 Cols on LG) */}
            <div className="lg:col-span-6 flex flex-col space-y-5">
              {/* Top metadata */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777A61] font-semibold">
                    {currentProduct.tag}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsInterestedOpen(true)}
                      className="p-1 text-[#171717] hover:text-[#777A61] transition-colors"
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
                            title: `AFTERCLASS — ${currentProduct.title}`,
                            url: window.location.href,
                          });
                        }
                      }}
                      className="p-1 text-[#171717] hover:text-[#777A61] transition-colors"
                      title="Share product"
                      aria-label="Share product"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)] mb-1.5">
                  {currentProduct.title}
                </h3>

                <p className="text-xs text-[#171717]/70 leading-relaxed mb-3">
                  {currentProduct.description}
                </p>

                <div className="flex items-center gap-3 text-xs">
                  <span className="inline-flex items-center gap-1 bg-[#171717] text-[#F5F2EB] px-2 py-0.5 font-bold font-mono text-[10px]">
                    {currentProduct.rating} <Star className="w-2.5 h-2.5 fill-current text-[#777A61]" />
                  </span>
                  <span className="text-[#171717]/70 text-[11px]">{currentProduct.reviews}</span>
                  <span className="text-[#777A61] font-mono text-[11px]">• AFTERCLASS ASSURED</span>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="p-3.5 bg-[#F5F2EB] border border-[#171717]/20">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-extrabold text-[#171717] font-mono">
                    ₹{currentProduct.price}
                  </span>
                  <span className="text-xs line-through text-[#171717]/40 font-mono">
                    ₹{currentProduct.originalPrice}
                  </span>
                  <span className="text-xs font-bold text-red-600 font-mono tracking-wider">
                    {currentProduct.discountPercentage}
                  </span>
                </div>
                
                <div className="mt-2 p-2 bg-white border border-[#777A61]/50 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#171717] uppercase tracking-wider flex items-center gap-1 font-mono text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-[#777A61]" />
                    INTERESTED BUYERS GET 10% OFF
                  </span>
                  <span className="font-mono font-bold text-[#777A61] text-xs">
                    PAY: ₹{currentProduct.discountPrice}
                  </span>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#171717] block mb-2">
                  Color: <strong>{currentColor.label}</strong>
                </span>
                <div className="flex items-center gap-2.5">
                  {currentProduct.variants.map((v, i) => (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => {
                        setSelectedColorIdx(i);
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 border-2 transition-all cursor-pointer ${
                        selectedColorIdx === i
                          ? "border-[#171717] bg-white shadow-xs"
                          : "border-[#171717]/20 hover:border-[#171717]/60 bg-[#F5F2EB]"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/30"
                        style={{ backgroundColor: v.code }}
                      />
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
                        {v.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#171717]">
                    Size: <strong>{selectedSize}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeChartOpen(true)}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#171717] hover:text-[#777A61] underline transition-colors cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5 text-[#777A61]" />
                    Size Guide (XS–3XL)
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[42px] py-2 px-2.5 text-xs font-bold uppercase font-mono tracking-wider transition-all cursor-pointer ${
                        selectedSize === size
                          ? "bg-[#171717] text-[#F5F2EB] border-2 border-[#171717]"
                          : "bg-white text-[#171717] border border-[#171717]/25 hover:border-[#171717]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Call to Action */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => setIsInterestedOpen(true)}
                  className="w-full py-3.5 px-5 bg-[#171717] hover:bg-[#777A61] text-[#F5F2EB] text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_#777A61]"
                >
                  <Bell className="w-4 h-4" />
                  <span>I&apos;M INTERESTED — SECURE 10% OFF DROP</span>
                </button>
                <p className="text-[10px] text-center text-[#171717]/60 font-mono">
                  No payment needed now • ₹540 priority coupon delivered on WhatsApp before public drop
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-[10px] text-[#171717]/80 font-mono">
                <div className="flex items-center gap-1.5 p-1.5 bg-[#F5F2EB] border border-[#171717]/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#777A61] shrink-0" />
                  <span>100% Combed Cotton</span>
                </div>
                <div className="flex items-center gap-1.5 p-1.5 bg-[#F5F2EB] border border-[#171717]/10">
                  <Truck className="w-3.5 h-3.5 text-[#777A61] shrink-0" />
                  <span>Express Delivery</span>
                </div>
                <div className="flex items-center gap-1.5 p-1.5 bg-[#F5F2EB] border border-[#171717]/10">
                  <RotateCcw className="w-3.5 h-3.5 text-[#777A61] shrink-0" />
                  <span>Free Exchanges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Lead Capture Modal */}
      {isInterestedOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white border-2 border-[#171717] p-6 sm:p-8 shadow-[12px_12px_0px_0px_#171717]">
            <div className="flex items-start justify-between border-b border-[#171717]/10 pb-4 mb-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#777A61] block mb-1">
                  PRIORITY NOTIFY LIST
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

            <div className="p-3 bg-[#F5F2EB] border border-[#171717]/15 mb-5 text-xs flex justify-between items-center font-mono">
              <div>
                <span className="font-bold text-[#171717] block">{currentProduct.title}</span>
                <span className="text-[#777A61]">
                  Color: {currentColor.name} | Size: {selectedSize}
                </span>
                <span className="text-[10px] text-green-700 font-bold block mt-0.5">
                  ✓ 10% Early Bird Coupon Reserved: Pay ₹{currentProduct.discountPrice}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs line-through text-[#171717]/40 block">₹{currentProduct.price}</span>
                <span className="text-sm font-extrabold text-[#171717]">₹{currentProduct.discountPrice}</span>
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
                  className="mt-4 px-6 py-2.5 bg-[#171717] text-[#F5F2EB] text-xs font-bold uppercase tracking-wider hover:bg-[#777A61] transition-colors"
                >
                  Back to Showcase
                </button>
              </div>
            ) : (
              <form onSubmit={handleInterestSubmit} className="space-y-3.5">
                {formStatus === "error" && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label
                    htmlFor="drop-name"
                    className="block text-xs font-mono uppercase tracking-wider text-[#171717]"
                  >
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="drop-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aryan Mehra"
                    className="w-full bg-[#F5F2EB] border border-[#171717]/30 px-3 py-2 text-xs text-[#171717] placeholder:text-[#B8B5AE] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="drop-mobile"
                    className="block text-xs font-mono uppercase tracking-wider text-[#171717]"
                  >
                    Mobile / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-mono text-[#171717]/60">
                      +91
                    </span>
                    <input
                      id="drop-mobile"
                      type="tel"
                      required
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="9876543210"
                      className="w-full bg-[#F5F2EB] border border-[#171717]/30 pl-11 pr-3 py-2 text-xs text-[#171717] placeholder:text-[#B8B5AE] focus:outline-none focus:border-[#171717] font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label
                      htmlFor="drop-email"
                      className="block text-xs font-mono uppercase tracking-wider text-[#171717]"
                    >
                      Email Address
                    </label>
                    <input
                      id="drop-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full bg-[#F5F2EB] border border-[#171717]/30 px-3 py-2 text-xs text-[#171717] placeholder:text-[#B8B5AE] focus:outline-none focus:border-[#171717]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="drop-city"
                      className="block text-xs font-mono uppercase tracking-wider text-[#171717]"
                    >
                      City / State
                    </label>
                    <input
                      id="drop-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Mumbai, Delhi"
                      className="w-full bg-[#F5F2EB] border border-[#171717]/30 px-3 py-2 text-xs text-[#171717] placeholder:text-[#B8B5AE] focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#171717] hover:bg-[#777A61] text-[#F5F2EB] text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>RESERVING SPOT...</span>
                      </>
                    ) : (
                      <>
                        <span>CONFIRM NOTIFICATION & 10% DISCOUNT</span>
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
    </section>
  );
}
