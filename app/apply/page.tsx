"use client";
import MultiStepForm from "@/components/apply/multi-step-form";
import HowToApply from "@/components/shared/how-to-apply";

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        <div className="text-center">
          <h1 className="font-heading text-5xl font-bold mb-4">
            Complete Your Application
          </h1>
          <p className="text-muted-foreground">Scholarship Application</p>
        </div>
        <HowToApply />
        <MultiStepForm />
      </div>
    </div>
  );
}
