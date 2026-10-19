"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F5F2EB]/95 backdrop-blur-md border-b border-[#B8B5AE]/30 py-3 shadow-xs"
          : "bg-[#F5F2EB] border-b border-[#171717]/10 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold tracking-[-0.04em] font-[family-name:var(--font-heading)] uppercase text-[#171717] hover:opacity-80 transition-opacity"
        >
          AFTERCLASS
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10 text-xs font-semibold uppercase tracking-[0.15em] text-[#171717]">
          <Link
            href="#drop"
            className="hover:text-[#777A61] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#777A61] after:transition-all"
          >
            Shop
          </Link>
          <Link
            href="#drop"
            className="hover:text-[#777A61] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#777A61] after:transition-all"
          >
            Collections
          </Link>
          <Link
            href="#story"
            className="hover:text-[#777A61] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#777A61] after:transition-all"
          >
            Our Story
          </Link>
          <Link
            href="#register"
            className="hover:text-[#777A61] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#777A61] after:transition-all"
          >
            Launch Updates
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-5">
          <Link
            href="#register"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] bg-[#171717] text-[#F5F2EB] hover:bg-[#777A61] transition-colors"
          >
            Early Access
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#171717] focus:outline-none"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[calc(100%+1px)] bg-[#F5F2EB] border-b border-[#171717]/20 p-6 shadow-xl transition-all animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#171717]">
            <Link
              href="#drop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#B8B5AE]/30 hover:text-[#777A61] flex justify-between items-center"
            >
              Shop
              <span className="text-[10px] text-[#777A61]">COMING 31.12</span>
            </Link>
            <Link
              href="#drop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#B8B5AE]/30 hover:text-[#777A61]"
            >
              Collections
            </Link>
            <Link
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#B8B5AE]/30 hover:text-[#777A61]"
            >
              Our Story
            </Link>
            <Link
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#B8B5AE]/30 hover:text-[#777A61]"
            >
              Launch Updates
            </Link>
            <Link
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 w-full text-center py-3.5 bg-[#171717] text-[#F5F2EB] text-xs font-bold uppercase tracking-[0.2em]"
            >
              Get on the List
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
