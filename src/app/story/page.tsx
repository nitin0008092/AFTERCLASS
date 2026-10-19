import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Compass, Users, Sparkles } from "lucide-react";

export const metadata = {
  title: "Our Story // AFTERCLASS",
  description:
    "Founded by Laxya, Nitin, and Mimansha. AFTERCLASS is an independent Indian streetwear label built for the hours beyond the routine.",
};

export default function StoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F2EB] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* Story Hero */}
        <section className="py-20 sm:py-28 border-b border-[#171717]/15">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#777A61]">
              FOUNDERS // LAXYA • NITIN • MIMANSHA
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-[-0.04em] text-[#171717] font-[family-name:var(--font-heading)] leading-[1.05]">
              BEYOND THE <br />
              ROUTINE.
            </h1>
            <p className="text-lg sm:text-xl text-[#171717]/80 max-w-2xl mx-auto leading-relaxed font-normal">
              “Afterclass is about the hours beyond the routine — the music, the people, the places, and the style that make you who you are.”
            </p>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#777A61]">
              EVERYDAY UNIFORM. INDIVIDUAL EXPRESSION.
            </div>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="py-20 sm:py-28 border-b border-[#171717]/15 bg-[#FFFFFF]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Image Composition */}
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[4/5] bg-[#F5F2EB] border border-[#171717] overflow-hidden shadow-[10px_10px_0px_0px_#171717]">
                  <Image
                    src="/images/city-editorial.jpg"
                    alt="AFTERCLASS Editorial Streetwear Lookbook in Indian architecture"
                    fill
                    className="object-cover grayscale-[20%]"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#171717] text-[#F5F2EB] p-3 text-[10px] font-mono uppercase tracking-widest flex justify-between">
                    <span>STUDIO ATELIER</span>
                    <span>NEW DELHI // INDIA</span>
                  </div>
                </div>
              </div>

              {/* Right Column: The Genesis */}
              <div className="lg:col-span-6 space-y-6 text-[#171717]">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#777A61] block">
                  ORIGIN STORY
                </span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-[family-name:var(--font-heading)]">
                  AN INDEPENDENT INDIAN LABEL
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-[#171717]/80">
                  AFTERCLASS was conceived by three friends — <strong>Laxya</strong>, <strong>Nitin</strong>, and <strong>Mimansha</strong>. While our roots began within campus corridors, our vision immediately outgrew college boundaries. We saw an Indian streetwear market saturated with cheap poly-blends, borrowed Western tropes, and generic drops designed only for fast consumption.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-[#171717]/80">
                  We asked a simple question: why shouldn&apos;t Indian youth culture have a homegrown, fiercely independent label with the graphic depth, tactile weight, and editorial presence of the world&apos;s best fashion houses?
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-[#171717]/80">
                  That question became AFTERCLASS: heavyweight custom silhouettes, witty Gen-Z commentary, and timeless black-and-white palettes engineered for the everyday uniform.
                </p>

                {/* 3 Pillars */}
                <div className="pt-4 border-t border-[#171717]/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono uppercase tracking-wider">
                  <div>
                    <span className="text-[#777A61] block text-[10px]">01 // CRAFT</span>
                    <strong>Heavyweight Drape</strong>
                  </div>
                  <div>
                    <span className="text-[#777A61] block text-[10px]">02 // CULTURE</span>
                    <strong>Authentic Voice</strong>
                  </div>
                  <div>
                    <span className="text-[#777A61] block text-[10px]">03 // LAUNCH</span>
                    <strong>31 Dec 2026</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Founders Manifesto */}
        <section className="py-20 sm:py-28 bg-[#F5F2EB] border-b border-[#171717]/15">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#777A61]">
                THE COMMITMENT
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-[family-name:var(--font-heading)]">
                NO SHORTCUTS. NO COMPROMISE.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#FFFFFF] border border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717] space-y-3">
                <span className="text-xs font-mono font-bold text-[#777A61]">LAXYA</span>
                <h3 className="text-base font-bold uppercase tracking-tight">Creative & Brand</h3>
                <p className="text-xs text-[#171717]/70 leading-relaxed">
                  Steering graphic parody, brand voice, and the subversive aesthetic that separates AFTERCLASS from traditional apparel brands.
                </p>
              </div>

              <div className="bg-[#FFFFFF] border border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717] space-y-3">
                <span className="text-xs font-mono font-bold text-[#777A61]">NITIN</span>
                <h3 className="text-base font-bold uppercase tracking-tight">Engineering & Systems</h3>
                <p className="text-xs text-[#171717]/70 leading-relaxed">
                  Building direct-to-consumer technology, customer interest management, and the reliable infrastructure behind every drop.
                </p>
              </div>

              <div className="bg-[#FFFFFF] border border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717] space-y-3">
                <span className="text-xs font-mono font-bold text-[#777A61]">MIMANSHA</span>
                <h3 className="text-base font-bold uppercase tracking-tight">Product & Materials</h3>
                <p className="text-xs text-[#171717]/70 leading-relaxed">
                  Guiding garment construction, tactile hand-feel trials, and Indian manufacturing partnerships to preserve uncompromising standards.
                </p>
              </div>
            </div>

            <div className="text-center pt-8">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#171717] text-[#F5F2EB] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#777A61] transition-colors"
              >
                <span>EXPLORE COLLECTION ZERO</span>
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
