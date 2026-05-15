"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="section-pad bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Our Programs
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            World-class academic education combined with practical vocational
            skills
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {featuredPrograms.map((program, i) => (
            <motion.div key={i} variants={cardVariants}>
              <Card className="card-hover overflow-hidden group h-full shadow-subtle hover:shadow-elevated transition-smooth">
                <div
                  className="h-64 bg-cover bg-center relative overflow-hidden"
                  style={{ backgroundImage: `url(${program.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-6 left-6 text-5xl"
                  >
                    {program.icon}
                  </motion.div>
                </div>

                <CardContent className="p-8">
                  <h3 className="font-bold text-2xl mb-2 text-foreground group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-primary font-semibold text-sm mb-4">
                    {program.subtitle}
                  </p>

                  <p className="text-muted-foreground mb-8 line-clamp-3 text-sm">
                    {program.description}
                  </p>

                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-white transition-smooth"
                  >
                    <Link href={program.link}>
                      Explore {program.title.split(" ")[0]} Programs
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Link to Full Courses */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="outline" size="lg" asChild className="border-2">
            <Link href="/courses">
              View All Academic & Vocational Courses →
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
