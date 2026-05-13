"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import BiodataForm from "@/components/apply/biodata-form";
import EssayForm from "@/components/apply/essay-form";
import DocumentUpload from "@/components/apply/document-upload";
import AcademicDetailsForm from "@/components/apply/academic-form";
import ReviewSubmit from "@/components/apply/review-submit";

const steps = [
  "Personal Information",
  "Academic Details",
  "Essays",
  "Documents",
  "Review & Submit",
];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => Math.min(steps.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="bg-white dark:bg-card rounded-3xl shadow-xl p-10">
      <Progress
        value={((step + 1) / steps.length) * 100}
        className="mb-10 h-2"
      />

      <div className="mb-10">
        <h2 className="font-heading text-3xl font-semibold mb-2">
          {steps[step]}
        </h2>
        <p className="text-muted-foreground">
          Step {step + 1} of {steps.length}
        </p>
      </div>

      {step === 0 && <BiodataForm />}
      {step === 1 && <AcademicDetailsForm />}
      {step === 2 && <EssayForm />}
      {step === 3 && <DocumentUpload />}
      {step === 4 && <ReviewSubmit />}

      <div className="flex justify-between mt-12 pt-8 border-t">
        <Button variant="outline" onClick={prev} disabled={step === 0}>
          Previous
        </Button>
        <Button
          onClick={next}
          className="bg-gold hover:bg-amber-500 text-primary px-10"
        >
          {step === steps.length - 1 ? "Submit Application" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
