"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldAlert, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

export function FeaturedCollection() {
  return (
    <section id="drop" className="py-20 sm:py-28 bg-[#F5F2EB] border-b border-[#171717]/15">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 border-b border-[#171717]/10 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#777A61] block mb-2">
              INITIAL DROP CONCEPTS // PENDING FOUNDER APPROVAL
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-[-0.03em] text-[#171717] font-[family-name:var(--font-heading)]">
              COLLECTION ZERO
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#171717] hover:text-[#777A61] underline underline-offset-4"
            >
              <span>View All 6 Concepts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Prototype Warning Banner */}
        <div className="mb-10 p-4 bg-[#FFFFFF] border border-[#171717] flex items-start gap-3 shadow-[4px_4px_0px_0px_#171717]">
          <ShieldAlert className="w-5 h-5 text-[#777A61] shrink-0 mt-0.5" />
          <p className="text-xs text-[#171717]/85 leading-relaxed">
            <strong className="font-mono uppercase tracking-wider text-[#171717]">Pre-Launch Notice:</strong>{" "}
            Collection Zero is currently in sample prototyping. All designs are concepts undergoing internal review prior to commercial release. No payment is collected and availability is not guaranteed.
          </p>
        </div>

        {/* 6-Card Concept Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => {
            const previewImage =
              product.colors[0]?.images.model || "/images/hero.jpg";

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between bg-white border border-[#171717] p-3 hover:shadow-[6px_6px_0px_0px_#171717] transition-all duration-300"
              >
                <div>
                  {/* Visual */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="block relative aspect-square w-full bg-[#F5F2EB] overflow-hidden mb-4 border border-[#171717]/20"
                  >
                    <Image
                      src={previewImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-2 sm:p-3 transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badge Top Left */}
                    <div className="absolute top-2.5 left-2.5 bg-[#171717] text-[#F5F2EB] px-2 py-0.5 text-[9px] uppercase tracking-widest font-mono">
                      {product.conceptNumber.split("//")[0]}
                    </div>

                    {product.flaggedForIpReview && (
                      <div className="absolute top-2.5 right-2.5 bg-[#F5F2EB] text-[#777A61] border border-[#777A61] px-1.5 py-0.5 text-[8px] uppercase tracking-wider font-mono">
                        IP Review
                      </div>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="px-1">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-[#777A61] mb-1">
                      {product.fit}
                    </div>
                    <h3 className="text-lg font-bold uppercase tracking-tight text-[#171717] mb-1 font-[family-name:var(--font-heading)]">
                      <Link
                        href={`/products/${product.slug}`}
                        className="hover:text-[#777A61]"
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#171717]/70 leading-relaxed line-clamp-2 mb-3">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 px-1 border-t border-[#B8B5AE]/30 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-[#171717] tracking-tight">
                      ₹{product.launchPrice}
                    </span>
                    <span className="text-[10px] font-mono text-[#171717]/50 line-through ml-2">
                      MRP ₹{product.mrp}
                    </span>
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider bg-[#171717] text-[#F5F2EB] px-3 py-1.5 hover:bg-[#777A61] transition-colors"
                  >
                    <span>Register</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note regarding drop status */}
        <div className="mt-14 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#171717]/60">
            [ PLANNED LAUNCH DATE: 31 DECEMBER 2026 // FREE INTEREST REGISTRATION ]
          </p>
        </div>
      </div>
    </section>
  );
}
