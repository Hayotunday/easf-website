import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const featuredPrograms = [
  {
    title: "Academic Excellence",
    subtitle: "Undergraduate & Professional Degrees",
    description:
      "Accountancy, Computer Science, Business Administration, Mass Communication, Electrical Electronics & more",
    image: "/images/academic.jpg",
    icon: "🎓",
    link: "/courses",
  },
  {
    title: "Technical & Vocational Training",
    subtitle: "Hands-on Skills Development",
    description:
      "Computer Repair, Electrical Installation, Garment Making, Catering, P.O.P Installation, Painting Tech & more",
    image: "/images/vocational.jpg",
    icon: "🛠️",
    link: "/courses",
  },
  {
    title: "Leadership & Mentorship",
    subtitle: "Developing Future African Leaders",
    description:
      "Personal development, career guidance, networking, and leadership training for all scholars",
    image: "/images/leadership.jpg",
    icon: "🌟",
    link: "/about",
  },
];

export default function ProgramsPreview() {
  return (
    <section className="py-20 bg-surface-container">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-semibold mb-3">
            Our Programs
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            World-class academic education combined with practical vocational
            skills
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredPrograms.map((program, i) => (
            <Card key={i} className="card-hover overflow-hidden group">
              <div
                className="h-64 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${program.image})` }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <div className="absolute top-6 left-6 text-5xl drop-shadow-md">
                  {program.icon}
                </div>
              </div>

              <CardContent className="p-8">
                <h3 className="font-semibold text-2xl mb-1 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-gold font-medium text-sm mb-3">
                  {program.subtitle}
                </p>

                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {program.description}
                </p>

                <Button
                  asChild
                  className="w-full group-hover:bg-primary group-hover:text-white"
                >
                  <Link href={program.link}>
                    Explore {program.title.split(" ")[0]} Programs
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Link to Full Courses */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/courses">
              View All Academic & Vocational Courses →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
