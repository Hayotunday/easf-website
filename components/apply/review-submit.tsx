"use client";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import type { ApplicationData } from "@/types/application-types";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { questions } from "@/lib/data";

type Props = {
  data: ApplicationData;
  pdfDownloaded?: boolean;
  onPdfDownloaded?: () => void;
};

export default function ReviewSubmit({
  data,
  pdfDownloaded,
  onPdfDownloaded,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [generating, setGenerating] = useState(false);

  const [passportPreview, setPassportPreview] = useState<string | undefined>(
    undefined,
  );
  const [resultsPreview, setResultsPreview] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const p = data.passportPhoto;
    if (p?.file) {
      const u = URL.createObjectURL(p.file);
      setPassportPreview(u);
      return () => URL.revokeObjectURL(u);
    } else {
      setPassportPreview(p?.url || undefined);
    }
  }, [data.passportPhoto]);

  useEffect(() => {
    const a = data.academicResults;
    if (a?.file) {
      const u = URL.createObjectURL(a.file);
      setResultsPreview(u);
      return () => URL.revokeObjectURL(u);
    } else {
      setResultsPreview(a?.url || undefined);
    }
  }, [data.academicResults]);

  const downloadPdf = async () => {
    if (!containerRef.current) return;
    setGenerating(true);
    try {
      // Render a sanitized, print-friendly DOM to avoid complex CSS (oklab) parsing errors
      const safe = document.createElement("div");
      safe.setAttribute("aria-hidden", "true");
      safe.style.position = "fixed";
      safe.style.left = "-9999px";
      safe.style.top = "0";
      safe.style.width = "800px";
      safe.style.padding = "24px";
      safe.style.background = "#ffffff";
      safe.style.color = "#000000";
      safe.style.fontFamily = "Inter, Arial, sans-serif";
      safe.style.lineHeight = "1.4";

      const escape = (s?: string) =>
        s
          ? String(s)
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
          : "";

      let docsHtml = "";

      if (passportPreview) {
        docsHtml += `<div style=\"margin-bottom:16px;max-width:260px;\"><strong>Passport Photo</strong><br/><img src=\"${passportPreview}\" style=\"width:100%;height:auto;border-radius:12px;margin-top:10px;border:1px solid #ddd;\"/></div>`;
      } else {
        docsHtml += `<div style=\"margin-bottom:16px\"><strong>Passport Photo</strong><br/>${escape(data.passportPhoto?.name) || "(not uploaded)"}</div>`;
      }
      if (resultsPreview) {
        docsHtml += `<div style=\"margin-bottom:16px;max-width:260px;\"><strong>Academic Results Preview</strong><br/><img src=\"${resultsPreview}\" style=\"width:100%;height:auto;border-radius:12px;margin-top:10px;border:1px solid #ddd;\"/></div>`;
      } else {
        docsHtml += `<div style=\"margin-bottom:16px\"><strong>Academic Results</strong><br/>${escape(data.academicResults?.name) || "(not uploaded)"}</div>`;
      }

      const essaysHtml = (data.essays || [])
        .map(
          (e, i) => `
        <div style=\"margin-bottom:16px;padding:14px;border:1px solid #e2e8f0;border-radius:12px;background:#f9fafb;\">
          <div style=\"font-weight:700;margin-bottom:8px;\">${i + 1}. ${escape(questions[i])}</div>
          <div style=\"white-space:pre-wrap;color:#111;line-height:1.6;\">${escape(e) || "(not provided)"}</div>
        </div>
      `,
        )
        .join("");

      safe.innerHTML = `
        <div style=\"max-width:760px;margin:0 auto;color:#1f2937;font-family:Inter,Arial,sans-serif;\">
          <div style=\"display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:24px;\">
            <div style=\"flex:1;\">
              <h1 style=\"font-size:26px;font-weight:700;margin:0 0 8px;\">EASF Scholarship Application</h1>
              <div style=\"font-size:14px;color:#475569;\">Applicant: ${escape(data.fullName) || "Applicant"}</div>
              <div style=\"font-size:14px;color:#475569;\">Email: ${escape(data.email) || "—"}</div>
            </div>
            <div style=\"min-width:180px;text-align:right;color:#475569;font-size:12px;\">
              Generated: ${new Date().toLocaleDateString()}<br/>
              ${new Date().toLocaleTimeString()}
            </div>
          </div>

          <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:24px;\">
            <div style=\"padding:18px;border:1px solid #e5e7eb;border-radius:16px;background:#ffffff;\">
              <h2 style=\"font-size:16px;margin-bottom:12px;\">Personal Information</h2>
              <div style=\"line-height:1.75;color:#111;\">
                <div><strong>Full Name:</strong> ${escape(data.fullName) || "—"}</div>
                <div><strong>Phone:</strong> ${escape(data.phone) || "—"}</div>
                <div><strong>Nationality:</strong> ${escape(data.nationality) || "—"}</div>
                <div><strong>Gender:</strong> ${escape(data.gender) || "—"}</div>
                <div><strong>Date of Birth:</strong> ${escape(data.dateOfBirth) || "—"}</div>
                <div><strong>Address:</strong> ${escape(data.address) || "—"}</div>
              </div>
            </div>
            <div style=\"padding:18px;border:1px solid #e5e7eb;border-radius:16px;background:#ffffff;\">
              <h2 style=\"font-size:16px;margin-bottom:12px;\">Academic Details</h2>
              <div style=\"line-height:1.75;color:#111;\">
                <div><strong>Program:</strong> ${escape(data.program) || "—"}</div>
                <div><strong>Course of Study:</strong> ${escape(data.courseOfStudy) || "—"}</div>
                <div><strong>Study Mode:</strong> ${escape(data.studyMode) || "—"}</div>
                <div><strong>Vocational Track:</strong> ${escape(data.vocationalCourse) || "—"}</div>
                <div><strong>Previous School:</strong> ${escape(data.previousSchool) || "—"}</div>
                <div><strong>Graduation Year:</strong> ${escape(data.yearGraduation) || "—"}</div>
                <div><strong>O-Level Summary:</strong> ${escape(data.olevelGrade) || "—"}</div>
              </div>
            </div>
          </div>

          <div style=\"padding:18px;border:1px solid #e5e7eb;border-radius:16px;background:#ffffff;margin-bottom:24px;\">
            <h2 style=\"font-size:16px;margin-bottom:12px;\">Essays & Statements</h2>
            ${essaysHtml}
          </div>

          <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:10px\">
            <div style=\"padding:18px;border:1px solid #e5e7eb;border-radius:16px;background:#ffffff;\">
              <h2 style=\"font-size:16px;margin-bottom:12px;\">Passport Photo</h2>
              ${passportPreview ? `<img src=\"${passportPreview}\" style=\"width:100%;height:auto;border-radius:16px;border:1px solid #d1d5db;\"/>` : `<p style=\"color:#475569;\">${escape(data.passportPhoto?.name) || "(not uploaded)"}</p>`}
            </div>
            <div style=\"padding:18px;border:1px solid #e5e7eb;border-radius:16px;background:#ffffff;\">
              <h2 style=\"font-size:16px;margin-bottom:12px;\">Academic Results</h2>
              ${resultsPreview ? `<img src=\"${resultsPreview}\" style=\"width:100%;height:auto;border-radius:16px;border:1px solid #d1d5db;\"/>` : `<p style=\"color:#475569;\">${escape(data.academicResults?.name) || "(not uploaded)"}</p>`}
            </div>
          </div>

          <div style=\"margin-top:24px;font-size:12px;color:#6b7280;\">This PDF was generated from your application data. Please save a copy for your records.</div>
        </div>
      `;

      document.body.appendChild(safe);

      const canvas = await html2canvas(safe, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfPageHeight = pdf.internal.pageSize.getHeight();
      const pageHeightPx = Math.floor(
        (canvas.width * pdfPageHeight) / pdfWidth,
      );
      let pagePosition = 0;
      let pageIndex = 0;

      while (pagePosition < canvas.height) {
        const pageCanvas = document.createElement("canvas");
        const remainingHeight = canvas.height - pagePosition;
        const currentPageHeight = Math.min(pageHeightPx, remainingHeight);
        pageCanvas.width = canvas.width;
        pageCanvas.height = currentPageHeight;

        const pageCtx = pageCanvas.getContext("2d");
        if (!pageCtx) throw new Error("Unable to create PDF page canvas");

        pageCtx.drawImage(
          canvas,
          0,
          pagePosition,
          canvas.width,
          currentPageHeight,
          0,
          0,
          canvas.width,
          currentPageHeight,
        );

        const pageData = pageCanvas.toDataURL("image/png");
        const pageHeightMm = (currentPageHeight * pdfWidth) / canvas.width;

        if (pageIndex > 0) {
          pdf.addPage();
        }

        pdf.addImage(pageData, "PNG", 0, 0, pdfWidth, pageHeightMm);
        pagePosition += currentPageHeight;
        pageIndex += 1;
      }

      const name = data.fullName
        ? data.fullName.replace(/\s+/g, "_")
        : "application";
      pdf.save(`EASF-Application-${name}.pdf`);
      onPdfDownloaded?.();

      // Clean up
      document.body.removeChild(safe);
    } catch (err) {
      console.error("PDF generation error", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
        <h2 className="font-heading text-3xl font-semibold mb-2">
          Review Your Application
        </h2>
        <p className="text-muted-foreground">
          Please review all information before submitting
        </p>
        <p className="mt-3 text-sm text-amber-700">
          You must download a PDF copy of your completed application before you
          can submit. Please click "Download PDF" and save the file. Submission
          will remain disabled until you download it.
        </p>
      </div>

      <div ref={containerRef} className="grid gap-6 p-4 bg-white rounded-md">
        {/* Personal Info Summary */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <p className="text-muted-foreground">Full Name:</p>
              <p className="font-medium">{data.fullName || "—"}</p>
              <p className="text-muted-foreground">Email:</p>
              <p className="font-medium">{data.email || "—"}</p>
              <p className="text-muted-foreground">Phone:</p>
              <p className="font-medium">{data.phone || "—"}</p>
              <p className="text-muted-foreground">Nationality:</p>
              <p className="font-medium">{data.nationality || "—"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Academic Summary */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Academic Details</h3>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <p className="text-muted-foreground">Program:</p>
              <p className="font-medium">{data.program || "—"}</p>
              <p className="text-muted-foreground">Course:</p>
              <p className="font-medium">{data.courseOfStudy || "—"}</p>
              <p className="text-muted-foreground">Study Mode:</p>
              <p className="font-medium">
                {data.studyMode === "full-time" ? "Full Time" : "Part Time"}
              </p>
              <p className="text-muted-foreground">Institution:</p>
              <p className="font-medium">{data.previousSchool || "—"}</p>
              <p className="text-muted-foreground">Graduation Year:</p>
              <p className="font-medium">{data.yearGraduation || "—"}</p>
              <p className="text-muted-foreground">O-Level Results:</p>
              <p className="font-medium">{data.olevelGrade || "—"}</p>
              <p className="text-muted-foreground">Vocational Track:</p>
              <p className="font-medium">{data.vocationalCourse || "—"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Essays Summary */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Essays &amp; Statements</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              {data.essays.map((e, i) => (
                <div key={i}>
                  <strong className="text-foreground block mb-1">
                    {i + 1}. {questions[i]}
                  </strong>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {e || "(not provided)"}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Documents Uploaded</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" /> Passport
                  Photo
                </p>
                {data.passportPhoto && passportPreview ? (
                  <div className="rounded-xl border bg-muted/30 p-2 w-fit">
                    <img
                      src={passportPreview}
                      alt="Passport Preview"
                      className="h-32 w-32 object-contain rounded-lg shadow-sm"
                    />
                    <p className="text-[10px] text-muted-foreground mt-2 max-w-32 truncate">
                      {data.passportPhoto.name}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-destructive">Missing</p>
                )}
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" /> Academic
                  Results
                </p>
                {data.academicResults && resultsPreview ? (
                  <div className="rounded-xl border bg-muted/30 p-2 w-fit">
                    <img
                      src={resultsPreview}
                      alt="Results Preview"
                      className="h-32 w-32 object-contain rounded-lg shadow-sm"
                    />
                    <p className="text-[10px] text-muted-foreground mt-2 max-w-32 truncate">
                      {data.academicResults.name}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-destructive">Missing</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={downloadPdf} disabled={generating}>
          {generating
            ? "Generating PDF..."
            : pdfDownloaded
              ? "Re-download PDF"
              : "Download PDF"}
        </Button>
        <p className="text-sm text-muted-foreground">
          {pdfDownloaded
            ? "PDF downloaded — you may now submit."
            : "You must download the PDF before submitting."}
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
        <p className="text-amber-800 dark:text-amber-300 text-sm">
          By submitting this application, you confirm that all information
          provided is true and accurate. Any false information will lead to
          immediate disqualification.
        </p>
      </div>
    </div>
  );
}
