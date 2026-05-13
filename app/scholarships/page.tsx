import ScholarshipCard from "@/components/scholarship/scholarship-card";

const scholarships = [
  {
    slug: "academic",
    title: "Academic Scholarship",
    field: "STEM & Humanities",
    deadline: "June 30, 2026",
  },
  // Add more
];

export default function ScholarshipsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="font-heading text-5xl font-bold mb-4">
        Scholarship Programs
      </h1>
      <p className="text-xl text-muted-foreground mb-12">
        Find the right opportunity for your future.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scholarships.map((s) => (
          <ScholarshipCard key={s.slug} {...s} />
        ))}
      </div>
    </div>
  );
}
