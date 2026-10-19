import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, Compass } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F5F2EB] border-b border-[#171717]/15">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Typography & Call to Action (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            {/* Meta Tag Badge */}
            <div className="inline-flex items-center gap-2 mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#777A61]">
              <span className="w-2 h-2 rounded-full bg-[#777A61] animate-pulse" />
              <span>COLLECTION ZERO // DECEMBER 31, 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9] text-[#171717] font-[family-name:var(--font-heading)] mb-6">
              NOT MADE <br />
              <span className="text-[#171717] selection:bg-[#777A61]">TO BLEND IN.</span>
            </h1>

            {/* Supporting Editorial Copy */}
            <p className="text-lg sm:text-xl font-normal text-[#171717]/80 max-w-xl leading-relaxed mb-10 tracking-tight">
              Everyday uniform. Individual expression. Heavyweight cottons, drop shoulders,
              and deliberate graphic architecture engineered for the generation shaping tomorrow.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
              <Link
                href="#drop"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#171717] text-[#F5F2EB] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#777A61] transition-all group"
              >
                <span>EXPLORE THE DROP</span>
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>

              <Link
                href="#story"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#171717] text-[#171717] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#171717] hover:text-[#F5F2EB] transition-all"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>OUR STORY</span>
              </Link>
            </div>

            {/* Small Spec Line */}
            <div className="mt-12 pt-8 border-t border-[#B8B5AE]/30 flex flex-wrap gap-8 text-[11px] uppercase tracking-[0.15em] text-[#171717]/60">
              <div>
                <span className="block text-[#171717] font-semibold">280–320 GSM</span>
                <span>Heavyweight Knit</span>
              </div>
              <div>
                <span className="block text-[#171717] font-semibold">Bespoke Fit</span>
                <span>Boxy Drop-Shoulder</span>
              </div>
              <div>
                <span className="block text-[#171717] font-semibold">Origin</span>
                <span>Engineered in India</span>
              </div>
            </div>
          </div>

          {/* Editorial Visual Composition (Right 5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto bg-[#E5E2DA] border border-[#171717] overflow-hidden group shadow-[12px_12px_0px_0px_rgba(23,23,23,0.08)]">
              <Image
                src="/images/hero.jpg"
                alt="AFTERCLASS Editorial Streetwear Campaign model wearing oversized graphic tee in concrete architecture"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover object-center grayscale-[15%] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Editorial Caption Tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#171717]/85 backdrop-blur-xs text-[#F5F2EB] p-3 text-[10px] tracking-[0.18em] uppercase flex justify-between items-center border border-[#F5F2EB]/10">
                <span className="font-semibold">CAMPAIGN 01 // LOST IN CONCRETE</span>
                <span className="text-[#B8B5AE]">LOOK 04</span>
              </div>
            </div>

            {/* Asymmetric Design Annotation Stamp */}
            <div className="hidden sm:block absolute -top-4 -right-4 bg-[#F5F2EB] border border-[#171717] px-3 py-1.5 text-[9px] font-mono tracking-widest text-[#171717] uppercase z-20">
              FIG. 001 // EDITORIAL
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
