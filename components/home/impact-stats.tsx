const stats = [
  { number: "5,000+", label: "Scholars Supported" },
  { number: "100%", label: "Tuition Coverage" },
  { number: "120+", label: "Partner Institutions" },
  { number: "15+", label: "Vocational Tracks" },
];

export default function ImpactStats() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <div key={i}>
            <div className="text-5xl font-bold mb-2 text-gold">
              {stat.number}
            </div>
            <div className="text-lg opacity-90">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
