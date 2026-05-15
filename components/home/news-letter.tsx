"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("Thank you! You'll receive our updates.");
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="py-24 bg-primary text-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-balance">
            Stay Connected
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-12">
            Get updates on new opportunities and scholar success stories directly to your inbox.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-6 py-3.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-smooth"
            required
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gold hover:bg-amber-400 text-primary font-semibold px-8 transition-smooth disabled:opacity-70"
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-sm text-white/60 mt-6"
        >
          No spam. Unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
}
