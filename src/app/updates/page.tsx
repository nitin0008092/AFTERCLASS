import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { LaunchRegistration } from "@/components/LaunchRegistration";
import { Clock, CheckCircle2, CircleDashed, Calendar } from "lucide-react";

export const metadata = {
  title: "Launch Updates & Roadmap // AFTERCLASS",
  description:
    "Follow our journey towards the Collection Zero release on 31 December 2026. Prototyping notes, sampling logs, and drop announcements.",
};

const ROADMAP_STEPS = [
  {
    phase: "PHASE 01 // COMPLETED",
    title: "Brand Architecture & Initial Concepts",
    date: "Q3 2026",
    status: "completed",
    description:
      "Formulated brand manifesto and crafted 6 initial concept artworks: On a Diet (Coke), Wasted, But First Coffee, Bad at Replying, Pretty Suspicious, and Bad Decisions Club.",
  },
  {
    phase: "PHASE 02 // COMPLETED",
    title: "Studio Lookbook & Flat-Lay Assets",
    date: "Q4 2026",
    status: "completed",
    description:
      "Captured high-definition studio lookbook photography in New Delhi to stress-test drape, garment cut, and monochrome color balance.",
  },
  {
    phase: "PHASE 03 // ACTIVE",
    title: "Fabric Sourcing & Wash Resistance Trials",
    date: "IN PROGRESS",
    status: "active",
    description:
      "Testing heavyweight 100% combed cotton jersey weaves, enzyme washes for subtle vintage handfeel, and distress screenprint longevity across Indian climate conditions.",
  },
  {
    phase: "PHASE 04 // UPCOMING",
    title: "IP Clearance & Founder Sign-Off",
    date: "Q1 2027",
    status: "upcoming",
    description:
      "Rigorous legal and intellectual property clearance for all graphic parody concepts before final manufacturing batches are locked.",
  },
  {
    phase: "PHASE 05 // FINAL",
    title: "Collection Zero Launch Drop",
    date: "31 DECEMBER 2026",
    status: "upcoming",
    description:
      "Private early-access invitations sent to verified interest-registration list members, followed by public drop release.",
  },
];

export default function UpdatesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F2EB] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-20 sm:py-28 border-b border-[#171717]/15">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#777A61]">
              TRANSPARENCY ROADMAP
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
              LAUNCH ROADMAP
            </h1>
            <p className="text-base sm:text-lg text-[#171717]/70 max-w-xl mx-auto leading-relaxed">
              We believe in building in public. Track our sampling trials, manufacturing progress, and milestone drops leading to December 31, 2026.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 sm:py-24 border-b border-[#171717]/15 bg-[#FFFFFF]">
          <div className="max-w-4xl mx-auto px-5 sm:px-8">
            <div className="space-y-10 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#171717]/15">
              {ROADMAP_STEPS.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-6 pl-10 group">
                  {/* Dot */}
                  <div
                    className={`absolute left-0 top-1 w-7 h-7 rounded-full border flex items-center justify-center ${
                      step.status === "completed"
                        ? "bg-[#171717] border-[#171717] text-[#F5F2EB]"
                        : step.status === "active"
                        ? "bg-[#777A61] border-[#777A61] text-[#F5F2EB] animate-pulse"
                        : "bg-[#F5F2EB] border-[#B8B5AE] text-[#777A61]"
                    }`}
                  >
                    {step.status === "completed" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <CircleDashed className="w-4 h-4" />
                    )}
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-[#F5F2EB] border border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717]">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#777A61]">
                        {step.phase}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-[#171717] bg-[#FFFFFF] px-2 py-0.5 border border-[#171717]/20">
                        {step.date}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold uppercase tracking-tight text-[#171717] mb-2 font-[family-name:var(--font-heading)]">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#171717]/80 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Embedded Waitlist */}
        <LaunchRegistration />
      </main>

      <Footer />
    </div>
  );
}
