"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h1 className="font-heading text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-lg text-muted-foreground mb-10">
            We’d love to hear from you. Whether you’re a prospective scholar,
            partner, or donor.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">info@easf.org</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-muted-foreground">+27 11 000 0000</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Address</p>
                <p className="text-muted-foreground">
                  Johannesburg, South Africa
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-card p-8 rounded-3xl shadow-xl">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>

            <Input type="email" placeholder="Email Address" />
            <Input placeholder="Subject" />

            <Textarea placeholder="How can we help you?" className="min-h-45" />

            <Button
              type="submit"
              className="w-full bg-gold hover:bg-amber-500 text-primary py-6 text-lg"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
