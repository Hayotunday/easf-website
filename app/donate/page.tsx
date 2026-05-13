"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const tiers = [
  { amount: 5000, label: "Sponsor a Student" },
  { amount: 10000, label: "Full Semester Sponsor" },
  { amount: 25000, label: "Annual Scholarship" },
  { amount: 50000, label: "Visionary Donor" },
];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(10000);
  const [isMonthly, setIsMonthly] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h1 className="font-heading text-5xl font-bold mb-4">
          Support the Next Generation
        </h1>
        <p className="text-xl text-muted-foreground">
          Your donation changes lives across Africa
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-3 bg-muted p-1 rounded-full">
          <button
            onClick={() => setIsMonthly(false)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${!isMonthly ? "bg-white shadow" : ""}`}
          >
            One-time
          </button>
          <button
            onClick={() => setIsMonthly(true)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${isMonthly ? "bg-white shadow" : ""}`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="font-semibold text-2xl mb-6">Donation Tiers</h3>
          <div className="grid gap-4">
            {tiers.map((tier) => (
              <Card
                key={tier.amount}
                className={`cursor-pointer transition-all hover:shadow-md ${selectedAmount === tier.amount ? "ring-2 ring-gold" : ""}`}
                onClick={() => setSelectedAmount(tier.amount)}
              >
                <CardContent className="p-6 flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold">
                      ₦{tier.amount.toLocaleString()}
                    </p>
                    <p className="text-muted-foreground">{tier.label}</p>
                  </div>
                  <div className="text-2xl">❤️</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-8">
              <h3 className="font-semibold text-xl mb-6">Custom Amount</h3>
              <div className="relative mb-8">
                <span className="absolute left-4 top-3.5 text-2xl text-muted-foreground">
                  ₦
                </span>
                <Input
                  type="number"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(Number(e.target.value))}
                  className="pl-10 text-4xl h-16 font-bold"
                />
              </div>

              <Button
                size="lg"
                className="w-full bg-gold hover:bg-amber-500 text-primary text-lg py-7"
              >
                Donate ₦{selectedAmount.toLocaleString()}{" "}
                {isMonthly && "/month"}
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Secure donation powered by Stripe
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
