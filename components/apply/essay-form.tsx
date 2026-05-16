"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { toast } from "sonner";
import type {
  ApplicationData,
  EssayFormValues,
} from "@/types/application-types";

const questions = [
  "What are your long-term career goals and how does this scholarship align with them?",
  "Describe your current financial need and how these funds will be utilized.",
  "How will this scholarship impact your local community in Africa?",
  "Describe a significant challenge you have overcome and what you learned from it.",
  "Why have you chosen your specific field of study?",
  "If awarded, how do you plan to mentor future EASF applicants?",
];

const essaySchema = z.object({
  essays: z.array(z.string().min(10, "Please provide a response.")).length(6),
});

type Props = {
  data: ApplicationData;
  onUpdate: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
  onPrev?: () => void;
};

export default function EssayForm({ data, onUpdate, onNext }: Props) {
  const form = useForm<EssayFormValues>({
    resolver: zodResolver(essaySchema),
    defaultValues: {
      essays: data.essays,
    },
  });

  const onSubmit = (formData: EssayFormValues) => {
    onUpdate({ essays: formData.essays });
    toast.success("Essays saved successfully!");
    onNext();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FieldSet>
        <FieldGroup className="space-y-10">
          {questions.map((question, index) => (
            <Field key={index}>
              <FieldLabel>
                {index + 1}. {question}
              </FieldLabel>
              <Textarea
                placeholder="Type your detailed response here..."
                className="min-h-40 resize-y"
                {...form.register(`essays.${index}` as const)}
              />
              {form.formState.errors.essays?.[index] ? (
                <FieldError errors={[form.formState.errors.essays[index]]} />
              ) : null}
            </Field>
          ))}
        </FieldGroup>
      </FieldSet>

      <Button
        type="submit"
        className="w-full bg-gold hover:bg-amber-500 text-primary py-6"
      >
        Save Essays
      </Button>
    </form>
  );
}
