import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const scholarships = {
  "academic-excellence": {
    title: "Academic Excellence Scholarship",
    subtitle: "STEM & Humanities",
    deadline: "June 30, 2026",
    amount: "100% Tuition + Stipend",
    eligibility: [
      "Nigerian citizen aged 17-25",
      "Minimum 5 credits in O-Level",
      "Strong academic performance",
      "Demonstrated financial need",
    ],
    benefits: [
      "Full tuition coverage",
      "Monthly living stipend",
      "Mentorship program",
      "Leadership training",
      "Networking opportunities",
    ],
  },
};

export default function ScholarshipDetail({
  params,
}: {
  params: { slug: string };
}) {
  const scholarship = scholarships[params.slug as keyof typeof scholarships];

  if (!scholarship) notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-10">
        <h1 className="font-heading text-5xl font-bold mb-3">
          {scholarship.title}
        </h1>
        <p className="text-2xl text-muted-foreground">{scholarship.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-5 gap-10">
        <div className="md:col-span-3 space-y-10">
          <Card>
            <CardContent className="p-8">
              <h3 className="font-semibold text-xl mb-4">Benefits</h3>
              <ul className="space-y-3">
                {scholarship.benefits.map((benefit, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-gold">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="font-semibold text-xl mb-4">
                Eligibility Criteria
              </h3>
              <ul className="space-y-3">
                {scholarship.eligibility.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-green-600">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="sticky top-24">
            <CardContent className="p-8">
              <div className="text-center">
                <p className="text-sm uppercase tracking-widest text-muted-foreground">
                  Application Deadline
                </p>
                <p className="text-2xl font-semibold mt-2">
                  {scholarship.deadline}
                </p>
              </div>

              <div className="my-8 border-t border-b py-6 text-center">
                <p className="text-4xl font-bold text-gold">
                  {scholarship.amount}
                </p>
              </div>

              <Button
                size="lg"
                className="w-full bg-gold hover:bg-amber-500 text-primary py-7 text-lg"
                asChild
              >
                <a href="/apply">Apply Now</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
