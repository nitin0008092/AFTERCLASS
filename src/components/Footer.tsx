import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#171717] text-[#F5F2EB] pt-16 pb-12 border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#2A2A2A]">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="text-3xl font-extrabold tracking-[-0.04em] font-[family-name:var(--font-heading)] uppercase text-[#F5F2EB] hover:opacity-80 transition-opacity"
            >
              AFTERCLASS
            </Link>
            <p className="text-sm text-[#B8B5AE] max-w-sm leading-relaxed">
              Independent streetwear brand engineered in India for a global youth culture.
              Heavyweight essentials, deliberate silhouettes, and uncompromising quality.
            </p>
            <div className="pt-2 text-xs font-mono text-[#777A61] uppercase tracking-wider">
              EST. 2026 // ALL RIGHTS RESERVED
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#777A61]">
              INDEX
            </p>
            <ul className="space-y-2 text-xs uppercase tracking-wider font-medium text-[#B8B5AE]">
              <li>
                <Link href="/shop" className="hover:text-[#F5F2EB] transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#F5F2EB] transition-colors">
                  Collection Zero
                </Link>
              </li>
              <li>
                <Link href="/story" className="hover:text-[#F5F2EB] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/updates" className="hover:text-[#F5F2EB] transition-colors">
                  Launch Updates
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F5F2EB] transition-colors">
                  Contact & Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#777A61]">
              COMMUNITY
            </p>
            <ul className="space-y-2 text-xs uppercase tracking-wider font-medium text-[#B8B5AE]">
              <li>
                <a
                  href="https://instagram.com/afterclass.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5F2EB] transition-colors inline-flex items-center gap-1"
                >
                  Instagram <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:afterclass121@gmail.com"
                  className="hover:text-[#F5F2EB] transition-colors inline-flex items-center gap-1"
                >
                  afterclass121@gmail.com <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <span className="text-[#B8B5AE]/60 block text-[11px] normal-case tracking-normal">
                  Founders: Laxya • Nitin • Mimansha
                </span>
              </li>
            </ul>
          </div>

          {/* Legal / Policy */}
          <div className="md:col-span-2 space-y-3" id="privacy">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#777A61]">
              LEGAL
            </p>
            <ul className="space-y-2 text-xs uppercase tracking-wider font-medium text-[#B8B5AE]">
              <li>
                <Link href="/privacy" className="hover:text-[#F5F2EB] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#F5F2EB] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/updates" className="text-[#B8B5AE]/60 hover:text-[#F5F2EB] transition-colors">
                  Launch Roadmap
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[10px] font-mono text-[#777A61] hover:text-[#F5F2EB] transition-colors">
                  [Founder Portal]
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#B8B5AE]/60 uppercase tracking-widest gap-4">
          <p>© 2026 AFTERCLASS ATELIER. ALL RIGHTS RESERVED.</p>
          <p className="text-[11px]">MADE FOR WHAT&apos;S NEXT // INDIA</p>
        </div>
      </div>
    </footer>
  );
}
