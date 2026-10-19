import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BrandStatement } from "@/components/BrandStatement";
import { FeaturedCollection } from "@/components/FeaturedCollection";
import { EditorialSection } from "@/components/EditorialSection";
import { LaunchRegistration } from "@/components/LaunchRegistration";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BrandStatement />
        <FeaturedCollection />
        <EditorialSection />
        <LaunchRegistration />
      </main>
      <Footer />
    </div>
  );
}
