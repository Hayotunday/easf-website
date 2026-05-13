const testimonials = [
  {
    name: "Aisha Okoro",
    role: "Computer Science, University of Lagos",
    quote:
      "EASF didn't just pay my fees — they gave me a family and a purpose.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-surface-container">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-heading text-4xl font-semibold mb-12">
          Voices of Our Scholars
        </h2>
        {/* Add more testimonials as needed */}
      </div>
    </section>
  );
}
