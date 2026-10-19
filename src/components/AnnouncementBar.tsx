export function AnnouncementBar() {
  return (
    <aside
      aria-label="Announcement"
      className="bg-[#171717] text-[#F5F2EB] py-2 px-4 text-center border-b border-[#2A2A2A]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] md:text-xs tracking-[0.2em] font-medium uppercase">
        <span className="hidden sm:inline-block text-[#B8B5AE]">EST. 2026 // INDIA</span>
        <span className="mx-auto sm:mx-0 font-medium tracking-[0.25em]">
          INDEPENDENT STREETWEAR. MADE FOR WHAT&apos;S NEXT.
        </span>
        <span className="hidden sm:inline-block text-[#777A61]">DROP 01 — 31.12.26</span>
      </div>
    </aside>
  );
}
