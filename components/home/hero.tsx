"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  const badgeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.1 },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.3 },
    },
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero-students.svg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/75 to-primary/85" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-white text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={badgeVariants}
          className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-6 py-2.5 rounded-full text-sm font-medium mb-8 border border-white/20"
        >
          <span className="w-2 h-2 bg-gold rounded-full" />
          2026/2027 Enrolment Session Now Open
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="font-heading text-5xl md:text-7xl font-bold leading-[1.15] tracking-tight mb-8 text-balance"
        >
          Empowering the Next Generation of African Leaders
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={descriptionVariants}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-white/90 leading-relaxed"
        >
          Education for Africa Scholarship Foundation (EASF) provides{" "}
          <span className="font-semibold text-gold">100% scholarships</span>,{" "}
          mentorship, and support to high-achieving African students.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.5 } },
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="bg-gold hover:bg-amber-400 text-primary font-semibold text-base px-10 transition-smooth"
            asChild
          >
            <Link href="/apply">Apply Now</Link>
          </Button>
          <Button
            size="lg"
            className="border-2 border-white text-white bg-transparent hover:bg-white/10 font-semibold text-base px-10 transition-smooth"
            asChild
          >
            <Link href="/scholarships">View Programs</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}
