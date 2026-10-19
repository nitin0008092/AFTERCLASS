"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, Check } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  priceNote: string;
  weight: string;
  image: string;
  swatches: string[];
  description: string;
}

const PRODUCTS: Product[] = [
  {
    id: "01",
    name: "Core Oversized Tee",
    category: "01 // ESSENTIAL",
    priceNote: "₹2,490 (Est. Launch Price)",
    weight: "280 GSM",
    image: "/images/product-1.jpg",
    swatches: ["#171717", "#F5F2EB", "#777A61"],
    description: "Relaxed silhouette with minimal chest typography and seamless reinforced ribbed collar.",
  },
  {
    id: "02",
    name: "Graphic Statement Tee",
    category: "02 // ARTWORK",
    priceNote: "₹2,890 (Est. Launch Price)",
    weight: "300 GSM",
    image: "/images/product-2.jpg",
    swatches: ["#F5F2EB", "#171717"],
    description: "Brutalist architectural artwork screenprinted with distress vintage ink finish.",
  },
  {
    id: "03",
    name: "Washed Essential Tee",
    category: "03 // PIGMENT DYE",
    priceNote: "₹2,690 (Est. Launch Price)",
    weight: "290 GSM",
    image: "/images/product-3.jpg",
    swatches: ["#777A61", "#B8B5AE", "#171717"],
    description: "Enzyme-washed muted olive with subtle vintage patina and soft peach handfeel.",
  },
  {
    id: "04",
    name: "Heavyweight Everyday Tee",
    category: "04 // ARCHIVE",
    priceNote: "₹2,990 (Est. Launch Price)",
    weight: "320 GSM",
    image: "/images/product-4.jpg",
    swatches: ["#B8B5AE", "#171717"],
    description: "Dense 320 GSM combed jersey with architectural back typography and dropped hem.",
  },
];

export function FeaturedCollection() {
  const [activeQuickView, setActiveQuickView] = useState<string | null>(null);

  return (
    <section id="drop" className="py-20 sm:py-28 bg-[#F5F2EB] border-b border-[#171717]/15">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-[#171717]/10 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#777A61] block mb-2">
              INITIAL DROP CONCEPTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-[-0.03em] text-[#171717] font-[family-name:var(--font-heading)]">
              COLLECTION ZERO
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs uppercase tracking-[0.15em] text-[#171717]/60 max-w-xs text-left md:text-right">
            Pre-launch preview. Final cut, fabric weights & pricing subject to launch drop date.
          </p>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white border border-[#171717]/10 p-3 hover:border-[#171717] transition-all duration-300"
            >
              {/* Product Visual */}
              <div className="relative aspect-[3/4] w-full bg-[#F5F2EB] overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Badge Top Left */}
                <div className="absolute top-2.5 left-2.5 bg-[#171717] text-[#F5F2EB] px-2 py-0.5 text-[9px] uppercase tracking-widest font-mono">
                  {product.weight}
                </div>

                {/* Subtle Detail Trigger */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveQuickView(activeQuickView === product.id ? null : product.id)
                  }
                  className="absolute bottom-2.5 right-2.5 bg-[#F5F2EB] border border-[#171717] p-2 text-[#171717] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#171717] hover:text-[#F5F2EB]"
                  title="View silhouette spec"
                  aria-label="View silhouette spec"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-1 justify-between pt-1">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#777A61] mb-1">
                    {product.category}
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-tight text-[#171717] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#171717]/70 leading-relaxed line-clamp-2 mb-3">
                    {product.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#B8B5AE]/20 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#171717] tracking-tight">
                    {product.priceNote}
                  </span>

                  {/* Swatches */}
                  <div className="flex items-center gap-1.5" title="Available launch shades">
                    {product.swatches.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-2.5 h-2.5 rounded-full border border-black/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick Info Drawer if opened */}
                {activeQuickView === product.id && (
                  <div className="mt-3 p-3 bg-[#F5F2EB] text-[11px] text-[#171717] border border-[#171717]/10 animate-in fade-in-50">
                    <p className="font-semibold uppercase tracking-wider mb-1 flex items-center gap-1 text-[#777A61]">
                      <Check className="w-3 h-3" /> Pre-Launch Spec
                    </p>
                    <p className="text-[#171717]/80">
                      Crafted with 100% long-staple combed cotton. Shrinkage-controlled wash.
                      Strictly limited to 150 pieces per colorway on Drop 01.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Note regarding drop status */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#171717]/60">
            [ DROP 01 LAUNCHING 31.12.2026 // NO PRE-SALES OR FAKE CART CHECKOUT ]
          </p>
        </div>
      </div>
    </section>
  );
}
