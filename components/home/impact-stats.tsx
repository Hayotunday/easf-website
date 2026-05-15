"use client";
import { motion } from "framer-motion";

const stats = [
  { number: "5,000+", label: "Scholars Supported" },
  { number: "100%", label: "Tuition Coverage" },
  { number: "120+", label: "Partner Institutions" },
  { number: "15+", label: "Vocational Tracks" },
];

export default function ImpactStats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-24 bg-primary text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="text-5xl md:text-6xl font-bold mb-3 text-gold group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-base md:text-lg text-white/80 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
