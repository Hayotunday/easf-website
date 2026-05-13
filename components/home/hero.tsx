import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section
      className="relative h-screen flex items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero-students.jpg')" }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-primary/90 via-primary/85 to-black/70" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-white">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-2.5 rounded-full text-sm font-medium mb-6">
          2026/2027 Enrolment Session Now Open
        </div>

        <h1 className="font-heading text-6xl md:text-7xl font-bold leading-[1.1] tracking-tighter mb-6">
          Empowering the Next
          <br />
          Generation of African Leaders
        </h1>

        <p className="text-xl md:text-2xl max-w-2xl mb-10">
          Education for Africa Scholarship Foundation (EASF) provides{" "}
          <span className="font-semibold">100% scholarships</span>, mentorship,
          and support to high-achieving African students.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button
            size="lg"
            className="bg-gold hover:bg-amber-500 text-primary text-lg px-10"
            asChild
          >
            <Link href="/apply">Apply Now</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white bg-primary hover:bg-white hover:text-primary text-lg px-10"
            asChild
          >
            <Link href="/scholarships">View Programs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
