import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions // AFTERCLASS",
  description:
    "Terms of pre-launch interest registration and concept preview for AFTERCLASS.",
};

export default function TermsPage() {
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
                TERMS & CONDITIONS
              </h1>
              <p className="text-xs font-mono text-[#777A61] mt-2">
                Pre-Launch Interest Registration Terms • Effective: October 20, 2026
              </p>
            </div>

            {/* Essential Pre-launch Disclosure */}
            <div className="p-4 bg-amber-500/10 border border-amber-600/40 text-[#171717] text-xs flex items-start gap-3 leading-relaxed">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Non-Binding Pre-Launch Registration:</strong> Submitting your interest on this platform is completely free. It does not constitute a financial transaction, a binding contract of sale, a confirmed pre-order, or a reservation of physical stock.
              </div>
            </div>

            <section className="space-y-3 text-xs sm:text-sm text-[#171717]/85 leading-relaxed">
              <h2 className="text-base font-bold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                1. Nature of the Platform
              </h2>
              <p>
                AFTERCLASS is an independent Indian streetwear brand founded by Laxya, Nitin, and Mimansha. Our scheduled drop date is <strong>December 31, 2026</strong>. The current website serves as an editorial preview, brand lookbook, and community interest-registration platform.
              </p>
            </section>

            <section className="space-y-3 text-xs sm:text-sm text-[#171717]/85 leading-relaxed">
              <h2 className="text-base font-bold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                2. Concept Status & Non-Guaranteed Availability
              </h2>
              <p>
                All garments, artworks, and designs showcased under &ldquo;Collection Zero&rdquo; (including <em>On a Diet (Coke)</em>, <em>Wasted</em>, <em>But First Coffee</em>, <em>Bad at Replying</em>, <em>Pretty Suspicious</em>, and <em>Bad Decisions Club</em>) represent creative concepts undergoing prototyping, fit testing, and sampling.
              </p>
              <p>
                AFTERCLASS reserves the absolute right to modify silhouettes, graphic placements, colorways, fabric specifications, and final release schedules prior to launch. Registration does not guarantee that a specific concept will enter commercial production.
              </p>
            </section>

            <section className="space-y-3 text-xs sm:text-sm text-[#171717]/85 leading-relaxed">
              <h2 className="text-base font-bold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                3. Indicative Pricing & No Payments
              </h2>
              <p>
                The stated launch price of <strong>₹699</strong> (and indicative MRP of ₹1,499) reflects our current target consumer pricing structure. Final retail pricing is subject to production costs, tax compliance, and shipping logistics at drop time. No payments are accepted on this website, and we will never request payment details during pre-launch registration.
              </p>
            </section>

            <section className="space-y-3 text-xs sm:text-sm text-[#171717]/85 leading-relaxed">
              <h2 className="text-base font-bold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                4. Intellectual Property & Original Graphics
              </h2>
              <p>
                AFTERCLASS is committed to creative integrity and original design. All graphic designs, logos, lookbook photographs, editorial copy, and brand assets displayed on this website are the proprietary creative work of AFTERCLASS and its founders, or are parody artworks undergoing intellectual property review prior to commercial distribution.
              </p>
              <p>
                Unauthorized copying, reproduction, re-hosting, or commercial exploitation of any AFTERCLASS graphics or assets is strictly prohibited.
              </p>
            </section>

            <section className="space-y-3 text-xs sm:text-sm text-[#171717]/85 leading-relaxed">
              <h2 className="text-base font-bold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                5. Communications Consent
              </h2>
              <p>
                By voluntarily submitting your contact details, you authorize AFTERCLASS to contact you via email and/or SMS/WhatsApp exclusively regarding launch updates, sample previews, priority drop notifications, and customer inquiries. We will not spam you or share your details with unaffiliated advertisers.
              </p>
            </section>

            <section className="space-y-3 text-xs sm:text-sm text-[#171717]/85 leading-relaxed">
              <h2 className="text-base font-bold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                6. Governing Law & Dispute Resolution
              </h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with this platform shall be subject to the jurisdiction of the competent courts of New Delhi, India.
              </p>
            </section>

            <section className="space-y-3 text-xs sm:text-sm text-[#171717]/85 leading-relaxed border-t border-[#171717]/10 pt-4">
              <h2 className="text-base font-bold uppercase tracking-tight text-[#171717] font-[family-name:var(--font-heading)]">
                7. Contact
              </h2>
              <p>
                For questions regarding these terms, contact the founders directly at{" "}
                <a href="mailto:afterclass121@gmail.com" className="font-bold underline">
                  afterclass121@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
