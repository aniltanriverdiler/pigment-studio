import { HomeHeroSection } from "@/components/HomeHeroSection";
import { GalleryShowcaseSection } from "@/components/GalleryShowcaseSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-3 sm:p-4 lg:p-5">
      <HomeHeroSection />
      <GalleryShowcaseSection />
      <HowItWorksSection />
    </main>
  );
}
