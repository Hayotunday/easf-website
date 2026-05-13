"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    toast.success("Thank you! You'll receive our updates.");
    setEmail("");
  };

  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-xl mx-auto px-6 text-center">
        <h2 className="font-heading text-3xl mb-4">Stay Connected</h2>
        <p className="mb-8">
          Get updates on new opportunities and scholar success stories.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-gold"
            required
          />
          <Button type="submit" className="bg-gold text-primary px-8">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
