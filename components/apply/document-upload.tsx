"use client";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

export default function DocumentUpload() {
  return (
    <FieldSet>
      <FieldGroup className="space-y-8">
        {/* Passport Photo */}
        <Field>
          <FieldLabel>Passport Photograph *</FieldLabel>
          <FieldDescription>JPG or PNG, max 2MB</FieldDescription>

          <div className="border-2 border-dashed border-muted-foreground/30 rounded-2xl p-10 text-center hover:border-gold transition-colors cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="font-medium">Click to upload passport photo</p>
            <Button variant="outline" className="mt-4">
              Choose File
            </Button>
          </div>
        </Field>

        {/* Academic Documents */}
        <Field>
          <FieldLabel>O-Level / WAEC Result (Optional)</FieldLabel>
          <FieldDescription>PDF format preferred</FieldDescription>

          <div className="border rounded-xl p-6 flex items-center gap-4 hover:bg-muted/50 transition-colors cursor-pointer">
            <FileText className="h-10 w-10 text-gold" />
            <div className="flex-1">
              <p className="font-medium">Upload Academic Results</p>
              <p className="text-sm text-muted-foreground">
                Scanned copy of results
              </p>
            </div>
            <Button variant="outline" size="sm">
              Upload
            </Button>
          </div>
        </Field>
      </FieldGroup>

      <Button className="w-full mt-10 bg-gold hover:bg-amber-500 text-primary py-6">
        Upload All Documents & Continue
      </Button>
    </FieldSet>
  );
}
