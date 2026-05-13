"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";

const questions = [
  "What are your long-term career goals and how does this scholarship align with them?",
  "Describe your current financial need and how these funds will be utilized.",
  "How will this scholarship impact your local community in Africa?",
  "Describe a significant challenge you have overcome and what you learned from it.",
  "Why have you chosen your specific field of study?",
  "If awarded, how do you plan to mentor future EASF applicants?",
];

export default function EssayForm() {
  return (
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
            />
          </Field>
        ))}
      </FieldGroup>

      <Button className="w-full mt-8 bg-gold hover:bg-amber-500 text-primary py-6">
        Save Essays
      </Button>
    </FieldSet>
  );
}
