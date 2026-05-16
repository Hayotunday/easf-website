"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import type { ApplicationData } from "@/types/application-types";

type Props = {
  data: ApplicationData;
};

export default function ReviewSubmit({ data }: Props) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
        <h2 className="font-heading text-3xl font-semibold mb-2">
          Review Your Application
        </h2>
        <p className="text-muted-foreground">
          Please review all information before submitting
        </p>
      </div>

      <div className="grid gap-6">
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
              <p className="font-medium">{data.institution || "—"}</p>
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
                  <strong>Question {i + 1}:</strong>
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
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-3 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>
                  {data.passportPhoto?.name ?? "No passport photo uploaded"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>
                  {data.academicResults?.name ?? "No academic results uploaded"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
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
