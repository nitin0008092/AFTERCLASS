import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function EditorialSection() {
  return (
    <section className="bg-[#171717] text-[#F5F2EB] py-20 sm:py-32 overflow-hidden border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Asymmetric Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-8">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#777A61] block mb-3">
              EDITORIAL VOLUME 01
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-[-0.04em] leading-[0.95] text-[#F5F2EB] font-[family-name:var(--font-heading)]">
              THE CITY <br />
              IS THE STUDIO.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base text-[#B8B5AE] leading-relaxed">
              We find inspiration in industrial overpasses, unpolished concrete facades, late-night
              listening parties, and the raw creative grit of metropolitan youth. Streetwear isn&apos;t
              merchandise — it&apos;s personal architecture.
            </p>
          </div>
        </div>

        {/* Wide Editorial Image Asset */}
        <div className="relative aspect-[16/9] w-full border border-[#2E2E2E] overflow-hidden mb-12 shadow-2xl">
          <Image
            src="/images/city-editorial.jpg"
            alt="AFTERCLASS Editorial Streetwear Photography in Concrete Urban Setting"
            fill
            sizes="100vw"
            className="object-cover object-center grayscale-[10%] contrast-[1.08] hover:scale-[1.02] transition-transform duration-700 ease-out"
          />

          {/* Editorial Overlay Plate */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[#171717]/85 backdrop-blur-xs border border-white/10 px-4 py-2 text-[10px] font-mono tracking-widest uppercase">
            <span>LOCATION: SECTOR 4 ARCHIVE // 18:45 IST</span>
          </div>

          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#171717]/85 backdrop-blur-xs border border-white/10 px-4 py-2 text-[10px] font-mono tracking-widest uppercase text-[#777A61]">
            <span>STYLING: AFTERCLASS ATELIER</span>
          </div>
        </div>

        {/* Editorial Sub-features / Magazine layout cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#2A2A2A] text-xs">
          <div className="space-y-2">
            <span className="font-mono text-[#777A61] uppercase tracking-wider block">01 / FABRICATION</span>
            <h3 className="text-base font-bold uppercase tracking-tight text-[#F5F2EB]">Heavyweight Cotton Jersey</h3>
            <p className="text-[#B8B5AE] leading-relaxed">
              Knitted from 100% sustainable combed cotton yarns to achieve a dense, drape-retaining 280 to 320 GSM weight that improves with age.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-[#777A61] uppercase tracking-wider block">02 / PROPORTION</span>
            <h3 className="text-base font-bold uppercase tracking-tight text-[#F5F2EB]">Architectural Boxy Cut</h3>
            <p className="text-[#B8B5AE] leading-relaxed">
              Dropped shoulders, structured collar circumference, and wide elbow-grazing sleeves built for modern relaxed layering.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-[#777A61] uppercase tracking-wider block">03 / FINISH</span>
            <h3 className="text-base font-bold uppercase tracking-tight text-[#F5F2EB]">Custom Enzyme Patina</h3>
            <p className="text-[#B8B5AE] leading-relaxed">
              Every garment undergoes a bespoke washed treatment ensuring a broken-in feel straight out of the box with zero stiff handfeel.
            </p>
          </div>
        </div>

        {/* Bottom CTA to Early Access */}
        <div className="mt-12 text-center">
          <Link
            href="#register"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5F2EB] hover:text-[#777A61] transition-colors border-b border-[#F5F2EB] hover:border-[#777A61] pb-1"
          >
            JOIN THE DROP WAITLIST
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
