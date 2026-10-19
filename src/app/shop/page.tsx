import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { PRODUCTS } from "@/lib/products";
import { ArrowRight, Sparkles, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Shop Collection Zero // AFTERCLASS",
  description:
    "Explore AFTERCLASS Collection Zero concepts: Oversized heavyweight graphic T-shirts engineered for the hours beyond the routine.",
};

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F2EB] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* Editorial Header */}
        <section className="border-b border-[#171717]/15 py-16 sm:py-24 bg-[#F5F2EB]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#171717]/10 pb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#777A61] block mb-2">
                  CATALOG // 6 INITIAL DROP CONCEPTS
                </span>
                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-[-0.04em] text-[#171717] font-[family-name:var(--font-heading)]">
                  COLLECTION ZERO
                </h1>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#171717]/60 max-w-sm">
                Target Launch Date: 31 December 2026 • Launch Target: ₹699 (MRP ₹1,499)
              </div>
            </div>

            {/* Concept Status Warning Banner */}
            <div className="mt-8 p-4 bg-[#FFFFFF] border border-[#171717] flex items-start gap-3 shadow-[4px_4px_0px_0px_#171717]">
              <ShieldAlert className="w-5 h-5 text-[#777A61] shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-[#171717]">
                <strong className="uppercase font-mono tracking-wider text-[#171717]">
                  Concept Development Notice:
                </strong>{" "}
                The garments featured below represent preliminary creative concepts currently undergoing sample prototyping, fabric testing, and intellectual property review. Availability and final specifications are not guaranteed. Registration of interest is free and does not constitute a purchase or confirmed order.
              </div>
            </div>
          </div>
        </section>

        {/* 6-Product Concept Grid */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {PRODUCTS.map((product) => {
                const primaryColor = product.colors[0];
                const previewImg = primaryColor?.images.model || "/images/hero.jpg";

                return (
                  <div
                    key={product.id}
                    className="group bg-[#FFFFFF] border border-[#171717] flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(23,23,23,0.08)] hover:shadow-[8px_8px_0px_0px_#171717] transition-all duration-300"
                  >
                    <div>
                      {/* Image Frame */}
                      <Link
                        href={`/products/${product.slug}`}
                        className="block relative aspect-[4/5] bg-[#F5F2EB] overflow-hidden border-b border-[#171717]"
                      >
                        <Image
                          src={previewImg}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain p-2 sm:p-3 transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Top badges */}
                        <div className="absolute top-3 left-3 bg-[#171717] text-[#F5F2EB] px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest">
                          {product.conceptNumber.split("//")[0]}
                        </div>

                        {product.flaggedForIpReview && (
                          <div className="absolute top-3 right-3 bg-[#F5F2EB] text-[#777A61] border border-[#777A61] px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider">
                            IP REVIEW PENDING
                          </div>
                        )}
                      </Link>

                      {/* Content Area */}
                      <div className="p-5 sm:p-6">
                        <div className="text-[10px] font-mono text-[#777A61] uppercase tracking-wider mb-1">
                          {product.fit}
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)] mb-2">
                          <Link href={`/products/${product.slug}`} className="hover:text-[#777A61]">
                            {product.name}
                          </Link>
                        </h2>
                        <p className="text-xs text-[#171717]/70 leading-relaxed mb-4 line-clamp-2">
                          {product.tagline}
                        </p>

                        {/* Colour Swatches */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-[10px] font-mono text-[#171717]/60 uppercase">
                            Colours:
                          </span>
                          <div className="flex items-center gap-1.5">
                            {product.colors.map((c) => (
                              <span
                                key={c.name}
                                title={c.name}
                                className="w-3.5 h-3.5 rounded-full border border-[#171717]/30 inline-block"
                                style={{ backgroundColor: c.hex }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & CTA */}
                    <div className="p-5 sm:p-6 pt-0 border-t border-[#171717]/10 flex items-center justify-between mt-2">
                      <div>
                        <div className="text-base font-black text-[#171717]">
                          ₹{product.launchPrice}
                        </div>
                        <div className="text-[10px] font-mono text-[#171717]/50 line-through">
                          MRP ₹{product.mrp}
                        </div>
                      </div>

                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#171717] hover:bg-[#777A61] text-[#F5F2EB] text-[11px] font-bold uppercase tracking-wider transition-colors"
                      >
                        <span>VIEW CONCEPT</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="bg-[#171717] text-[#F5F2EB] py-16 border-t border-[#2A2A2A]">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#777A61]">
              DECEMBER 31, 2026 // DROP 01
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-[family-name:var(--font-heading)]">
              NOT MADE TO BLEND IN.
            </h2>
            <p className="text-sm text-[#B8B5AE] max-w-xl mx-auto leading-relaxed">
              Everyday uniform. Individual expression. No pre-sales, no fake cart pressure. Just genuine streetwear for the hours beyond the routine.
            </p>
            <div className="pt-4">
              <Link
                href="/#register"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F5F2EB] text-[#171717] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B8B5AE] transition-colors"
              >
                <span>JOIN THE DROP LIST</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
