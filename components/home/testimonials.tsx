"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Aisha Okoro",
    role: "Computer Science, University of Lagos",
    quote:
      "EASF didn't just pay my fees — they gave me a family and a purpose.",
  },
  {
    name: "Chukwu Okafor",
    role: "Business Administration, Pan-Atlantic University",
    quote:
      "The mentorship and support have transformed how I approach my career and life.",
  },
  {
    name: "Zainab Hassan",
    role: "Mass Communication, Covenant University",
    quote:
      "This scholarship removed the weight from my shoulders and let me focus on excellence.",
  },
];

export default function Testimonials() {
  return (
    <section className="section-pad bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground text-balance">
            Voices of Our Scholars
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Real stories from students whose lives have been transformed
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full shadow-subtle hover:shadow-elevated transition-smooth border-border/40">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-6">
                    <div className="text-4xl text-primary mb-4">"</div>
                    <p className="text-lg font-serif italic text-foreground leading-relaxed mb-6">
                      {testimonial.quote}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-border/20">
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
