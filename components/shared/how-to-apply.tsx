"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function HowToApply() {
  const router = useRouter();
  const pathname = usePathname();

  const handleApply = () => {
    try {
      if (pathname === "/apply") {
        const el = document.getElementById("apply-form");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      // navigate to apply page with hash — browser will scroll to the anchor
      router.push("/apply#apply-form");
    } catch (err) {
      // fallback navigation
      router.push("/apply#apply-form");
    }
  };

  return (
    <section className="bg-card/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-6">
      <h3 className="text-4xl md:text-5xl font-semibold mb-4">How to Apply</h3>
      <ol className="list-decimal pl-6 space-y-3 text-muted-foreground flex flex-col items-center">
        <li>Complete the multi-step application form with accurate details.</li>
        <li>Upload a recent passport photograph and your academic results.</li>
        <li>Answer all essay questions with detailed, thoughtful responses.</li>
        <li>Review your information carefully before submitting.</li>
        <li>
          Submit your application; we will email confirmation once processed.
        </li>
      </ol>

      <div className="mt-3">
        <Button
          onClick={handleApply}
          className="bg-gold hover:bg-amber-500 text-primary"
        >
          Apply Now
        </Button>
      </div>
    </section>
  );
}
