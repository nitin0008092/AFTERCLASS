export function BrandStatement() {
  return (
    <section id="story" className="py-24 sm:py-32 bg-[#F5F2EB] border-b border-[#171717]/15">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
        {/* Sub-label */}
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#777A61] mb-6">
          THE MANIFESTO
        </p>

        {/* Big Editorial Quote */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-[-0.04em] leading-[1.05] text-[#171717] font-[family-name:var(--font-heading)] mb-10">
          “WEAR WHAT FEELS <br className="hidden sm:inline" />
          LIKE YOU.”
        </h2>

        {/* Narrative */}
        <div className="max-w-2xl mx-auto">
          <p className="text-base sm:text-lg text-[#171717]/80 leading-relaxed font-normal mb-8">
            Afterclass is about the hours beyond the routine — the music, the people,
            the places, and the style that make you who you are. We don&apos;t follow trend
            cycles or mass-produce logos. We construct tactile, enduring garments designed
            to carry memories and define your presence.
          </p>

          {/* Minimalist Grid Signature */}
          <div className="inline-flex items-center gap-6 pt-6 border-t border-[#B8B5AE]/40 text-xs font-mono uppercase tracking-[0.15em] text-[#171717]/60">
            <span>DROP ZERO</span>
            <span>•</span>
            <span>NEW DELHI / GLOBAL</span>
            <span>•</span>
            <span>AFTER HOURS CULTURE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
