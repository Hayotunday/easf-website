"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  "Confirmation",
];

export default function MultiStepForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [applicationData, setApplicationData] = useState<ApplicationData>(
    defaultApplicationData,
  );
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  const next = () => setStep((s) => Math.min(steps.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  // Auto-scroll to the top of the form whenever the step changes
  useEffect(() => {
    const el = document.getElementById("apply-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  const onUpdate = (updates: Partial<ApplicationData>) => {
    setApplicationData((prev) => ({ ...prev, ...updates }));
  };

  const startNewApplication = () => {
    setApplicationData(defaultApplicationData);
    setSubmissionSuccess(false);
    setPdfDownloaded(false);
    setStep(0);
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.error || "Upload failed";
      throw new Error(message);
    }

    const json = await response.json();
    return json.secure_url;
  };

  const submitApplication = async () => {
    setSubmitting(true);
    try {
      let finalData = { ...applicationData };

      if (finalData.passportPhoto?.file) {
        toast.info("Uploading passport photo...");
        const url = await uploadToCloudinary(finalData.passportPhoto.file);
        finalData.passportPhoto = {
          ...finalData.passportPhoto,
          url,
          file: undefined,
        };
      }

      if (finalData.academicResults?.file) {
        toast.info("Uploading academic results...");
        const url = await uploadToCloudinary(finalData.academicResults.file);
        finalData.academicResults = {
          ...finalData.academicResults,
          url,
          file: undefined,
        };
      }

      console.log("Submitting Application:", finalData);

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (!res.ok) {
        let errorText = "Submission failed";
        try {
          const json = await res.json();
          errorText = json?.error || errorText;
        } catch {
          errorText = `Server Error (${res.status}): Please try again later.`;
        }
        throw new Error(errorText);
      }

      toast.success("Application submitted successfully!");
      setSubmissionSuccess(true);
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
      {step === 4 && (
        <ReviewSubmit
          data={applicationData}
          pdfDownloaded={pdfDownloaded}
          onPdfDownloaded={() => setPdfDownloaded(true)}
        />
      )}
      {step === 5 && submissionSuccess && (
        <div className="space-y-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700">
            <span className="text-3xl font-semibold">✓</span>
          </div>
          <h3 className="text-3xl font-semibold">Thank you for applying!</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your application has been submitted successfully. We will review it
            and notify you by email shortly.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="mx-auto bg-gold hover:bg-amber-500 text-primary px-10"
          >
            Return Home
          </Button>
          <Button
            onClick={startNewApplication}
            className="mx-auto bg-gold hover:bg-amber-500 text-primary px-10"
          >
            Fill New Application
          </Button>
        </div>
      )}

      {step !== steps.length - 1 && (
        <div className="flex justify-between mt-12 pt-8 border-t">
          <Button variant="outline" onClick={prev} disabled={step === 0}>
            Previous
          </Button>
          <Button
            onClick={step === steps.length - 2 ? submitApplication : next}
            className="bg-gold hover:bg-amber-500 text-primary px-10"
            disabled={
              submitting || (step === steps.length - 2 && !pdfDownloaded)
            }
          >
            {step === steps.length - 2
              ? submitting
                ? "Submitting..."
                : pdfDownloaded
                  ? "Submit Application"
                  : "Download PDF Required"
              : "Continue"}
          </Button>
        </div>
      )}
    </div>
  );
}
