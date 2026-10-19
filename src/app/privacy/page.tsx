import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ShieldCheck, Mail, Lock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy // AFTERCLASS",
  description:
    "Privacy and data protection notice for AFTERCLASS pre-launch interest registrations.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F2EB] text-[#171717]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#777A61] hover:text-[#171717] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </Link>
          </div>

          <div className="bg-[#FFFFFF] border border-[#171717] p-8 sm:p-12 shadow-[8px_8px_0px_0px_#171717] space-y-8">
            <div className="border-b border-[#171717]/15 pb-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#777A61] block mb-2">
                AFTERCLASS ATELIER // LEGAL
              </span>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                PRIVACY POLICY
              </h1>
              <p className="text-xs font-mono text-[#777A61] mt-2">
                Effective Date: October 20, 2026 • Last Updated: October 20, 2026
              </p>
            </div>

            {/* Core Summary Notice */}
            <div className="p-4 bg-[#F5F2EB] border border-[#171717] flex items-start gap-3 text-xs leading-relaxed">
              <ShieldCheck className="w-5 h-5 text-[#777A61] shrink-0 mt-0.5" />
              <div>
                <strong>Zero Payment Data Guarantee:</strong> AFTERCLASS is currently in pre-launch stage. We do not collect, process, or store credit cards, debit cards, UPI credentials, or financial account details. Registration is 100% free and voluntary.
              </div>
            </div>

            <section className="space-y-3 text-xs sm:text-sm text-[#171717]/85 leading-relaxed">
              <h2 className="text-base font-bold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                1. Information We Collect
              </h2>
              <p>
                When you submit an interest-registration or early-access request on the AFTERCLASS platform, we collect only the necessary information provided by you:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-[#171717]/80">
                <li><strong>Customer Full Name:</strong> Used to personalize communication.</li>
                <li><strong>Email Address:</strong> Required to deliver launch alerts, confirmation notices, and early access links.</li>
                <li><strong>Phone Number (Optional):</strong> If provided, used strictly for SMS or WhatsApp drop notifications on launch day.</li>
                <li><strong>Garment Preferences:</strong> Selected concept tee, colourway, size preference, and requested quantity to calibrate our production run.</li>
                <li><strong>Referral Source:</strong> General indicator of how you discovered AFTERCLASS (e.g., Instagram, campus, friend).</li>
              </ul>
            </section>

            <section className="space-y-3 text-xs sm:text-sm text-[#171717]/85 leading-relaxed">
              <h2 className="text-base font-bold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                2. How We Use Your Information
              </h2>
              <p>
                We use collected data solely for the following legitimate business purposes:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-[#171717]/80">
                <li>Confirming your registration and issuing your unique Registration ID.</li>
                <li>Sending pre-launch announcements, first looks, and private drop invitations prior to December 31, 2026.</li>
                <li>Estimating batch production sizing (S to XXL) to minimize unsold inventory and waste.</li>
                <li>Internal operations and customer support managed exclusively by the three founders.</li>
              </ul>
            </section>

            <section className="space-y-3 text-xs sm:text-sm text-[#171717]/85 leading-relaxed">
              <h2 className="text-base font-bold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                3. Data Storage & Security
              </h2>
              <p>
                Your registration is stored securely in our Supabase PostgreSQL database protected by Row Level Security (RLS) policies. Anonymous visitors cannot view or query customer records. Privileged operations are restricted to our verified server endpoints and the three founders (Laxya, Nitin, and Mimansha).
              </p>
              <p>
                We also maintain an operational spreadsheet view in a private Google Sheet accessible only to authorized founders. We do not sell, rent, monetize, or trade your personal data to any marketing brokers or third-party advertisers.
              </p>
            </section>

            <section className="space-y-3 text-xs sm:text-sm text-[#171717]/85 leading-relaxed">
              <h2 className="text-base font-bold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                4. Third-Party Service Providers
              </h2>
              <p>
                We partner with select infrastructure providers to facilitate operations:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs text-[#171717]/80">
                <li><strong>Resend:</strong> Used to deliver transactional emails and branded confirmation notices.</li>
                <li><strong>Google Workspace / Google Sheets API:</strong> Used for secure internal operational tracking among founders.</li>
                <li><strong>Supabase:</strong> Cloud database infrastructure with enterprise-grade data isolation.</li>
              </ul>
            </section>

            <section className="space-y-3 text-xs sm:text-sm text-[#171717]/85 leading-relaxed">
              <h2 className="text-base font-bold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                5. Your Rights & Data Deletion
              </h2>
              <p>
                You retain full control over your personal data. At any time, you may request to view, modify, or permanently delete your interest registration from our database. To request deletion, simply email our founders at:
              </p>
              <div className="p-3 bg-[#F5F2EB] border border-[#171717]/20 font-mono text-xs flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#777A61]" />
                <a href="mailto:afterclass121@gmail.com" className="text-[#171717] font-bold underline">
                  afterclass121@gmail.com
                </a>
              </div>
            </section>

            <section className="space-y-3 text-xs sm:text-sm text-[#171717]/85 leading-relaxed">
              <h2 className="text-base font-bold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                6. Governing Jurisdiction
              </h2>
              <p>
                This policy is drafted in accordance with Indian information technology principles and consumer guidelines. Any inquiries regarding data protection should be directed to the founders via our official contact channels.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
