"use client";
import { motion } from "framer-motion";

export default function Mission() {
  return (
    <section className="section-pad bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-10 text-foreground text-balance">
            Our Mission
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-block">
            <div className="h-1 w-16 bg-primary mb-6 mx-auto rounded-full" />
          </div>
          <p className="text-3xl md:text-4xl font-serif text-foreground leading-relaxed italic text-balance">
            &ldquo;Money should never be an obstacle to a quality education.&ldquo;
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          We are committed to dismantling financial barriers and fostering
          academic excellence across Africa by providing full scholarships and
          mentorship to talented youth.
        </motion.p>
      </div>
    </section>
  );
}
