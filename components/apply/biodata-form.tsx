"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  BiodataFormValues,
} from "@/types/application-types";

type Props = {
  data: ApplicationData;
  onUpdate: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
  onPrev?: () => void;
};

const biodataSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female"]),
  address: z.string().min(10, "Address is required"),
  nationality: z.string().min(2, "Nationality is required"),
});

export default function BiodataForm({ data, onUpdate, onNext, onPrev }: Props) {
  const form = useForm<BiodataFormValues>({
    resolver: zodResolver(biodataSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      address: data.address,
      nationality: data.nationality,
    },
  });

  const onSubmit = (formData: BiodataFormValues) => {
    onUpdate(formData);
    toast.success("Personal information saved successfully!");
    onNext();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FieldSet>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field>
            <FieldLabel htmlFor="fullName">Full Name *</FieldLabel>
            <Input
              id="fullName"
              placeholder="John Doe"
              {...form.register("fullName")}
            />
            <FieldError
              errors={
                form.formState.errors.fullName
                  ? [form.formState.errors.fullName]
                  : undefined
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email Address *</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...form.register("email")}
            />
            <FieldError
              errors={
                form.formState.errors.email
                  ? [form.formState.errors.email]
                  : undefined
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">Phone Number *</FieldLabel>
            <Input
              id="phone"
              placeholder="+234 801 234 5678"
              {...form.register("phone")}
            />
            <FieldError
              errors={
                form.formState.errors.phone
                  ? [form.formState.errors.phone]
                  : undefined
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="dateOfBirth">Date of Birth *</FieldLabel>
            <Input
              id="dateOfBirth"
              type="date"
              {...form.register("dateOfBirth")}
            />
            <FieldError
              errors={
                form.formState.errors.dateOfBirth
                  ? [form.formState.errors.dateOfBirth]
                  : undefined
              }
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      {/* Gender */}
      <FieldSet>
        <FieldLabel asChild>
          <legend>Gender *</legend>
        </FieldLabel>
        <FieldGroup>
          <RadioGroup
            value={form.watch("gender")}
            onValueChange={(value) =>
              form.setValue("gender", value as "male" | "female")
            }
            className="flex gap-6"
          >
            <Field orientation="horizontal">
              <RadioGroupItem value="male" id="male" />
              <FieldLabel htmlFor="male" className="font-normal cursor-pointer">
                Male
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem value="female" id="female" />
              <FieldLabel
                htmlFor="female"
                className="font-normal cursor-pointer"
              >
                Female
              </FieldLabel>
            </Field>
          </RadioGroup>
        </FieldGroup>
      </FieldSet>

      <Field>
        <FieldLabel htmlFor="address">Residential Address *</FieldLabel>
        <Input
          id="address"
          placeholder="Enter your full residential address"
          {...form.register("address")}
        />
        <FieldError
          errors={
            form.formState.errors.address
              ? [form.formState.errors.address]
              : undefined
          }
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="nationality">Nationality *</FieldLabel>
        <Input
          id="nationality"
          placeholder="Nigeria"
          {...form.register("nationality")}
        />
        <FieldError
          errors={
            form.formState.errors.nationality
              ? [form.formState.errors.nationality]
              : undefined
          }
        />
      </Field>

      <Button
        type="submit"
        className="w-full bg-gold hover:bg-amber-500 text-primary font-semibold py-6"
      >
        Save & Continue
      </Button>
    </form>
  );
}
