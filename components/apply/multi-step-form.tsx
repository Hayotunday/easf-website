"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import BiodataForm from "@/components/apply/biodata-form";
import EssayForm from "@/components/apply/essay-form";
import DocumentUpload from "@/components/apply/document-upload";
import AcademicDetailsForm from "@/components/apply/academic-form";
import ReviewSubmit from "@/components/apply/review-submit";
import type { ApplicationData } from "@/types/application-types";
import { defaultApplicationData } from "@/types/application-types";

const steps = [
  "Personal Information",
  "Academic Details",
  "Essays",
  "Documents",
  "Review & Submit",
];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [applicationData, setApplicationData] = useState<ApplicationData>(
    defaultApplicationData,
  );
  const [submitting, setSubmitting] = useState(false);

  const next = () => setStep((s) => Math.min(steps.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const onUpdate = (updates: Partial<ApplicationData>) => {
    setApplicationData((prev) => ({ ...prev, ...updates }));
  };

  const submitApplication = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Submission failed");
      toast.success("Application submitted successfully!");
      setStep(steps.length - 1);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="apply-form"
      className="bg-white dark:bg-card rounded-3xl shadow-xl p-10 scroll-mt-10"
    >
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

      {step === 0 && (
        <BiodataForm data={applicationData} onUpdate={onUpdate} onNext={next} />
      )}
      {step === 1 && (
        <AcademicDetailsForm
          data={applicationData}
          onUpdate={onUpdate}
          onNext={next}
          onPrev={prev}
        />
      )}
      {step === 2 && (
        <EssayForm
          data={applicationData}
          onUpdate={onUpdate}
          onNext={next}
          onPrev={prev}
        />
      )}
      {step === 3 && (
        <DocumentUpload
          data={applicationData}
          onUpdate={onUpdate}
          onNext={next}
          onPrev={prev}
        />
      )}
      {step === 4 && <ReviewSubmit data={applicationData} />}

      <div className="flex justify-between mt-12 pt-8 border-t">
        <Button variant="outline" onClick={prev} disabled={step === 0}>
          Previous
        </Button>
        <Button
          onClick={step === steps.length - 1 ? submitApplication : next}
          className="bg-gold hover:bg-amber-500 text-primary px-10"
          disabled={submitting}
        >
          {step === steps.length - 1
            ? submitting
              ? "Submitting..."
              : "Submit Application"
            : "Continue"}
        </Button>
      </div>
    </div>
  );
}
