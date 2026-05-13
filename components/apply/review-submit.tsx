"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ReviewSubmit() {
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
              <p className="font-medium">[Your Full Name]</p>
              <p className="text-muted-foreground">Email:</p>
              <p className="font-medium">[your@email.com]</p>
              <p className="text-muted-foreground">Nationality:</p>
              <p className="font-medium">Nigeria</p>
            </div>
          </CardContent>
        </Card>

        {/* Academic Summary */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Academic Details</h3>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <p className="text-muted-foreground">Program:</p>
              <p className="font-medium">Undergraduate Degree</p>
              <p className="text-muted-foreground">Course:</p>
              <p className="font-medium">Computer Science</p>
              <p className="text-muted-foreground">Study Mode:</p>
              <p className="font-medium">Full Time</p>
            </div>
          </CardContent>
        </Card>

        {/* Essays Summary */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Essays &amp; Statements</h3>
            <p className="text-sm text-muted-foreground">
              6 essay questions completed • All responses provided
            </p>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Documents Uploaded</h3>
            <div className="flex items-center gap-3 text-sm text-green-600">
              <CheckCircle className="h-5 w-5" />
              Passport Photograph
            </div>
            <div className="flex items-center gap-3 text-sm text-green-600 mt-2">
              <CheckCircle className="h-5 w-5" />
              Academic Results
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
