"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { toast } from "sonner";
import type {
  ApplicationData,
  AcademicFormValues,
} from "@/types/application-types";

const vocationalCourses = [
  "Computer Repair & Maintenance Tech",
  "Paints Production & Painting Tech",
  "Electrical Installation Tech",
  "Catering",
  "P.O.P Installation Tech",
  "Garment Making & Design",
];

const academicCourses = [
  "Accountancy",
  "Business Administration",
  "Science Lab Tech",
  "Computer Science",
  "Mass Communication",
  "Electrical Electronics",
  "Computer Engineering",
];

const academicSchema = z.object({
  program: z.string().min(1, "Please select a program"),
  studyMode: z.enum(["full-time", "part-time"]),
  courseOfStudy: z.string().min(1, "Course of study is required"),
  vocationalCourse: z.string().min(2, "Preferred vocationalCourse is required"),
  previousSchool: z.string().min(3, "Previous school is required"),
  olevelGrade: z.string().min(1, "O-Level grade summary is required"),
  yearGraduation: z.string().min(1, "Expected graduation year is required"),
});

type Props = {
  data: ApplicationData;
  onUpdate: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
  onPrev?: () => void;
};

export default function AcademicDetailsForm({
  data,
  onUpdate,
  onNext,
  onPrev,
}: Props) {
  const form = useForm<AcademicFormValues>({
    resolver: zodResolver(academicSchema),
    defaultValues: {
      program: data.program,
      studyMode: data.studyMode,
      courseOfStudy: data.courseOfStudy,
      vocationalCourse: data.vocationalCourse,
      previousSchool: data.previousSchool,
      olevelGrade: data.olevelGrade,
      yearGraduation: data.yearGraduation,
    },
  });

  const onSubmit = (formData: AcademicFormValues) => {
    onUpdate(formData);
    toast.success("Academic information saved successfully!");
    onNext();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FieldSet>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Program Selector */}
          <Field>
            <FieldLabel>Program *</FieldLabel>
            <Select
              value={form.watch("program")}
              onValueChange={(value) => form.setValue("program", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="undergraduate">
                  Undergraduate Degree
                </SelectItem>
                <SelectItem value="vocational">Vocational Training</SelectItem>
                <SelectItem value="postgraduate">
                  Postgraduate Degree
                </SelectItem>
              </SelectContent>
            </Select>
            <FieldError
              errors={
                form.formState.errors.program
                  ? [form.formState.errors.program]
                  : undefined
              }
            />
          </Field>

          {/* Study Mode */}
          <Field>
            <FieldLabel>Study Mode *</FieldLabel>
            <Select
              value={form.watch("studyMode")}
              defaultValue="full-time"
              onValueChange={(value) =>
                form.setValue("studyMode", value as "full-time" | "part-time")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Course of Study */}
          <Field>
            <FieldLabel htmlFor="courseOfStudy">
              Course of Study / Field *
            </FieldLabel>
            <Select
              value={form.watch("courseOfStudy")}
              onValueChange={(value) => form.setValue("courseOfStudy", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Course of Study" />
              </SelectTrigger>
              <SelectContent>
                {academicCourses.map((course, id) => (
                  <SelectItem key={`${id}`} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError
              errors={
                form.formState.errors.courseOfStudy
                  ? [form.formState.errors.courseOfStudy]
                  : undefined
              }
            />
          </Field>

          {/* Preferred Vocational Course */}
          <Field>
            <FieldLabel>Vocational Course</FieldLabel>
            <Select
              value={form.watch("vocationalCourse")}
              onValueChange={(value) =>
                form.setValue("vocationalCourse", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Preferred Vocational Course" />
              </SelectTrigger>
              <SelectContent>
                {vocationalCourses.map((course, id) => (
                  <SelectItem key={`${id}`} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* <FieldDescription>Leave blank if flexible</FieldDescription> */}
          </Field>
        </FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldGroup className="space-y-6">
          {/* Previous School */}
          <Field>
            <FieldLabel htmlFor="previousSchool">
              Most Recent School Attended *
            </FieldLabel>
            <Input
              id="previousSchool"
              placeholder="e.g. Federal Government College"
              {...form.register("previousSchool")}
            />
            <FieldError
              errors={
                form.formState.errors.previousSchool
                  ? [form.formState.errors.previousSchool]
                  : undefined
              }
            />
          </Field>

          {/* O-Level Grade Summary */}
          <Field>
            <FieldLabel htmlFor="olevelGrade">
              O-Level / WAEC / NECO Summary *
            </FieldLabel>
            <Input
              id="olevelGrade"
              placeholder="e.g. 5 Distinctions, 4 Credits"
              {...form.register("olevelGrade")}
            />
            <FieldDescription>Brief summary of your results</FieldDescription>
            <FieldError
              errors={
                form.formState.errors.olevelGrade
                  ? [form.formState.errors.olevelGrade]
                  : undefined
              }
            />
          </Field>

          {/* Expected Graduation */}
          <Field>
            <FieldLabel htmlFor="yearGraduation">
              Year of Graduation (Sec. level) *
            </FieldLabel>
            <Input
              id="yearGraduation"
              type="number"
              placeholder="2026"
              {...form.register("yearGraduation")}
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button
        type="submit"
        className="w-full bg-gold hover:bg-amber-500 text-primary font-semibold py-6"
      >
        Save Academic Details
      </Button>
    </form>
  );
}
