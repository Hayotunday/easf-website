import Hero from "@/components/home/hero";
import Mission from "@/components/home/mission";
import ImpactStats from "@/components/home/impact-stats";
import ProgramsPreview from "@/components/home/programs-preview";
import Testimonials from "@/components/home/testimonials";
import Newsletter from "@/components/home/news-letter";
import HowToApply from "@/components/shared/how-to-apply";

export default function Home() {
  return (
    <main>
      <Hero />
      <Mission />
      <HowToApply />
      <ImpactStats />
      <ProgramsPreview />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
