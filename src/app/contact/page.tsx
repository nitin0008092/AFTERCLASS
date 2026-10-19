import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { Mail, Camera, MapPin, ArrowRight, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact & Community // AFTERCLASS",
  description:
    "Get in touch with AFTERCLASS founders Laxya, Nitin, and Mimansha. Press, collaborations, and pre-launch inquiries.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F2EB] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          {/* Header */}
          <div className="border-b border-[#171717]/15 pb-8 mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#777A61] block mb-2">
              STUDIO ATELIER // REACH OUT
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
              CONTACT & COMMUNITY
            </h1>
            <p className="text-sm sm:text-base text-[#171717]/70 mt-3 max-w-xl">
              We respond directly to every genuine message. Whether you want to talk design, collaborate, or join our campus ambassador network.
            </p>
          </div>

          {/* Contact Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Direct Email */}
            <div className="bg-[#FFFFFF] border border-[#171717] p-8 shadow-[6px_6px_0px_0px_#171717] space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#171717] text-[#F5F2EB] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#777A61] block">
                DIRECT FOUNDER INBOX
              </span>
              <h3 className="text-lg font-bold uppercase tracking-tight text-[#171717]">
                General & Press
              </h3>
              <p className="text-xs text-[#171717]/75 leading-relaxed">
                Send queries, press inquiries, and concept feedback directly to our shared inbox.
              </p>
              <a
                href="mailto:afterclass121@gmail.com"
                className="inline-block text-xs font-mono font-bold text-[#171717] underline hover:text-[#777A61]"
              >
                afterclass121@gmail.com
              </a>
            </div>

            {/* Instagram */}
            <div className="bg-[#FFFFFF] border border-[#171717] p-8 shadow-[6px_6px_0px_0px_#171717] space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#171717] text-[#F5F2EB] flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#777A61] block">
                OFFICIAL INSTAGRAM
              </span>
              <h3 className="text-lg font-bold uppercase tracking-tight text-[#171717]">
                Visual Culture
              </h3>
              <p className="text-xs text-[#171717]/75 leading-relaxed">
                Follow sampling logs, behind-the-scenes lookbook shoots, and drop announcements.
              </p>
              <a
                href="https://instagram.com/afterclass.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-mono font-bold text-[#171717] underline hover:text-[#777A61]"
              >
                @afterclass.in
              </a>
            </div>

            {/* Atelier Location */}
            <div className="bg-[#FFFFFF] border border-[#171717] p-8 shadow-[6px_6px_0px_0px_#171717] space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#171717] text-[#F5F2EB] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#777A61] block">
                ORIGIN & BASE
              </span>
              <h3 className="text-lg font-bold uppercase tracking-tight text-[#171717]">
                New Delhi, India
              </h3>
              <p className="text-xs text-[#171717]/75 leading-relaxed">
                Engineered in the capital for a generation that commands attention without saying a word.
              </p>
              <span className="text-xs font-mono text-[#777A61] block">
                EST. 2026 // INDIA
              </span>
            </div>
          </div>

          {/* Quick FAQ / Founder Promise */}
          <div className="bg-[#171717] text-[#F5F2EB] p-8 sm:p-12 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#777A61]">
              A NOTE FROM LAXYA, NITIN & MIMANSHA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-[family-name:var(--font-heading)]">
              WE BUILD FOR WHAT&apos;S NEXT.
            </h2>
            <p className="text-xs sm:text-sm text-[#B8B5AE] leading-relaxed max-w-2xl">
              We started AFTERCLASS not to churn out fast fashion, but to create garments that feel like personal armor during the hours after class and after routine. Thank you for your support as we refine our first collection for December 31, 2026.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5F2EB] text-[#171717] text-xs font-bold uppercase tracking-wider hover:bg-[#B8B5AE] transition-colors"
              >
                <span>EXPLORE COLLECTION ZERO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
