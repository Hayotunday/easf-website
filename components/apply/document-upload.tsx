"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { toast } from "sonner";
import type {
  ApplicationData,
  DocumentUploadValues,
} from "@/types/application-types";

type Props = {
  data: ApplicationData;
  onUpdate: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
  onPrev?: () => void;
};

export default function DocumentUpload({ data, onUpdate, onNext }: Props) {
  const passportRef = useRef<HTMLInputElement | null>(null);
  const resultsRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof DocumentUploadValues,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const meta = { name: file.name, type: file.type, size: file.size };
    onUpdate({ [key]: meta } as Partial<ApplicationData>);
    toast.success(`${file.name} selected`);
  };

  return (
    <FieldSet>
      <FieldGroup className="space-y-8">
        {/* Passport Photo */}
        <Field>
          <FieldLabel>Passport Photograph *</FieldLabel>
          <FieldDescription>JPG or PNG, max 2MB</FieldDescription>

          <div className="border-2 border-dashed border-muted-foreground/30 rounded-2xl p-10 text-center hover:border-gold transition-colors cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="font-medium">
              {data.passportPhoto?.name ?? "Click to upload passport photo"}
            </p>
            <input
              type="file"
              accept="image/*"
              ref={passportRef}
              className="hidden"
              onChange={(e) => handleFile(e, "passportPhoto")}
            />
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => passportRef.current?.click()}
            >
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
              <p className="font-medium">
                {data.academicResults?.name ?? "Upload Academic Results"}
              </p>
              <p className="text-sm text-muted-foreground">
                Scanned copy of results
              </p>
            </div>
            <input
              type="file"
              accept="application/pdf,image/*"
              ref={resultsRef}
              className="hidden"
              onChange={(e) => handleFile(e, "academicResults")}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => resultsRef.current?.click()}
            >
              Upload
            </Button>
          </div>
        </Field>
      </FieldGroup>

      <Button
        onClick={() => {
          toast.success("Documents saved");
          onNext();
        }}
        className="w-full mt-10 bg-gold hover:bg-amber-500 text-primary py-6"
      >
        Upload All Documents & Continue
      </Button>
    </FieldSet>
  );
}
