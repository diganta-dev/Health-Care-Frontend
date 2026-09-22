"use client";

import { useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BriefcaseMedical,
  CheckCircle2,
  FileCheck2,
  FileText,
  FileUp,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Trash2,
  UploadCloud,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  doctorApplicationSchema,
  isAcceptedFileSize,
  isAcceptedFileType,
  MAX_ADDITIONAL_FILES,
  MAX_FILE_SIZE,
} from "@/doctor-application.validation";
import { formatFileSize } from "@/utils";
import { useApplyAsDoctor } from "@/hooks";
import { toast } from "../ui/toast";
import { DoctorApplicationData } from "@/types";

//* Data signature
// {
//   "user": {
//     "name": "Dr. Sarah Jenkins",
//     "email": "dr.sarah.jenkins@example.com"
//   },
//   "doctor": {
//     "address": "123 Medical Plaza, Suite 400, New York, NY",
//     "specialization": "Cardiology",
//     "licenseNumber": "MED-2026-98765",
//     "qualifications": "MD, FACC - Harvard Medical School",
//     "experienceYears": 12,
//     "bio": "Dedicated cardiologist with over a decade of experience specializing in non-invasive cardiovascular imaging and preventative heart care.",
//     "consultationFee": 150,
//     "contactNumber": "+1-555-0199"
//   }
// }

export default function DoctorApplyForm() {
  const router = useRouter();
  const { mutate: apply, isPending: isApplyingAsDoctor } = useApplyAsDoctor();

  const form = useForm({
    // defaultValues: {
    //   name: "Mizan",
    //   email: "drmir+409238@gmail.com",
    //   phone: "01912345678",
    //   address: "Neptune",
    //   specialization: "Cardiologist",
    //   licenseNumber: "ABC12334957w3",
    //   qualifications: "MBBS",
    //   experienceYears: "50",
    //   consultationFee: "10000",
    //   bio: "My life, my rules.",
    //   resume: null as File | null,
    //   additionalFiles: [] as File[],
    // },
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      specialization: "",
      licenseNumber: "",
      qualifications: "",
      experienceYears: "",
      consultationFee: "",
      bio: "",
      resume: null as File | null,
      additionalFiles: [] as File[],
    },

    validators: {
      onSubmit: doctorApplicationSchema,
    },

    onSubmit: async ({ value }) => {
      const doctorData: DoctorApplicationData = {
        user: {
          name: value.name.trim(),
          email: value.email.trim(),
        },
        doctor: {
          specialization: value.specialization.trim(),
          licenseNumber: value.licenseNumber.trim(),
          qualifications: value.qualifications.trim(),
          experienceYears: Number(value.experienceYears),
          contactNumber: value.phone.trim(),
          address: value.address.trim(),
          consultationFee: value.consultationFee.trim()
            ? Number(value.consultationFee)
            : undefined,
          bio: value.bio.trim(),
        },
      };

      apply(
        {
          data: doctorData,
          resume: value.resume as File,
          additionalFiles: value.additionalFiles,
        },
        {
          onSuccess: (res) => {
            if (!res.success) {
              toast.add({
                title: "Server Failure",
                description: "Something went wrong. Please try again",
                type: "error",
              });
              return;
            }

            toast.add({
              title: "Application Submitted",
              description: "Please verify your account",
              type: "success",
            });
            const params = new URLSearchParams({
              email: doctorData.user.email,
            });
            router.push(`/apply/verify-account?${params.toString()}`);
          },
          onError: (err) => {
            toast.add({
              title: "Application failure",
              description:
                err.message || "Something went wrong. Please try again",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <Card className="w-full border-border/80 shadow-lg bg-card/95 backdrop-blur-sm overflow-hidden">
      {/* Header Section */}
      <CardHeader className="p-6 pb-5 border-b border-border/60 bg-gradient-to-b from-muted/40 to-transparent">
        <div className="flex flex-col gap-2.5">
          <div className="inline-flex items-center gap-1.5 self-start rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Stethoscope className="size-3.5" />
            <span>Medical Practitioner Onboarding</span>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Doctor Application
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-muted-foreground">
              Submit your medical credentials, licensing details, and clinical
              profile to join PH Healthcare's verified doctor network.
            </CardDescription>
          </div>
        </div>

        {/* Feature / Trust Pills */}
        <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-border/40 text-[11px] sm:text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="size-3.5 text-primary shrink-0" />
            <span className="truncate">BMDC Verified</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="size-3.5 text-primary shrink-0" />
            <span className="truncate">Direct Telehealth</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <BadgeCheck className="size-3.5 text-primary shrink-0" />
            <span className="truncate">Fast Board Review</span>
          </div>
        </div>
      </CardHeader>

      {/* Form Content */}
      <CardContent className="p-6 pt-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          noValidate
          className="space-y-8"
        >
          {/* SECTION 1: Personal Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <User className="size-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-foreground">
                  Personal & Contact Information
                </h2>
                <p className="text-xs text-muted-foreground">
                  Primary identification and contact details
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <form.Field name="name">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="gap-1.5">
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-xs font-medium"
                      >
                        Full Name <span className="text-destructive">*</span>
                      </FieldLabel>
                      <div className="group/input relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within/input:text-primary" />
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          placeholder="Dr. John Doe"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          className="h-10 pl-9 transition-all focus-visible:ring-primary/20"
                          autoComplete="name"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="gap-1.5">
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-xs font-medium"
                      >
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <div className="group/input relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within/input:text-primary" />
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          placeholder="doctor@phhealthcare.com"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          className="h-10 pl-9 transition-all focus-visible:ring-primary/20"
                          autoComplete="email"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="phone">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="gap-1.5">
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-xs font-medium"
                      >
                        Contact Number{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <div className="group/input relative">
                        <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within/input:text-primary" />
                        <Input
                          id={field.name}
                          name={field.name}
                          type="tel"
                          placeholder="+880 1712 345678"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          className="h-10 pl-9 transition-all focus-visible:ring-primary/20"
                          autoComplete="tel"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="address">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="gap-1.5">
                      <div className="flex items-center justify-between">
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-xs font-medium"
                        >
                          Practice Address
                        </FieldLabel>
                        <span className="text-[11px] text-muted-foreground font-normal">
                          (Optional)
                        </span>
                      </div>
                      <div className="group/input relative">
                        <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within/input:text-primary" />
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          placeholder="Chamber or hospital address"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          className="h-10 pl-9 transition-all focus-visible:ring-primary/20"
                          autoComplete="street-address"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>
          </div>

          {/* SECTION 2: Medical Qualifications & Licensing */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <BriefcaseMedical className="size-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-foreground">
                  Credentials & Practice Details
                </h2>
                <p className="text-xs text-muted-foreground">
                  Medical licensing and clinical specialization
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <form.Field name="specialization">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="gap-1.5">
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-xs font-medium"
                      >
                        Specialization{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <div className="group/input relative">
                        <Stethoscope className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within/input:text-primary" />
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          placeholder="e.g. Cardiologist, Neurologist"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          className="h-10 pl-9 transition-all focus-visible:ring-primary/20"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="licenseNumber">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="gap-1.5">
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-xs font-medium"
                      >
                        BMDC Registration Number{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <div className="group/input relative">
                        <BadgeCheck className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within/input:text-primary" />
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          placeholder="e.g. A-12345"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          className="h-10 pl-9 font-mono transition-all focus-visible:ring-primary/20"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="qualifications">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="gap-1.5">
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-xs font-medium"
                      >
                        Medical Qualifications{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <div className="group/input relative">
                        <GraduationCap className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within/input:text-primary" />
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          placeholder="e.g. MBBS, FCPS (Medicine)"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          className="h-10 pl-9 transition-all focus-visible:ring-primary/20"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="experienceYears">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="gap-1.5">
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-xs font-medium"
                      >
                        Years of Experience{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <div className="group/input relative">
                        <BriefcaseMedical className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within/input:text-primary" />
                        <Input
                          id={field.name}
                          name={field.name}
                          type="number"
                          min={0}
                          max={70}
                          inputMode="numeric"
                          placeholder="e.g. 10"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          className="h-10 pl-9 transition-all focus-visible:ring-primary/20"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <form.Field name="consultationFee">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="gap-1.5">
                      <div className="flex items-center justify-between">
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-xs font-medium"
                        >
                          Consultation Fee (BDT)
                        </FieldLabel>
                        <span className="text-[11px] text-muted-foreground font-normal">
                          (Optional)
                        </span>
                      </div>
                      <div className="group/input relative">
                        <Banknote className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within/input:text-primary" />
                        <Input
                          id={field.name}
                          name={field.name}
                          type="number"
                          min={0}
                          step="1"
                          inputMode="decimal"
                          placeholder="e.g. 1000"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          className="h-10 pl-9 transition-all focus-visible:ring-primary/20"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>
          </div>

          {/* SECTION 3: Professional Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <FileText className="size-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-foreground">
                  Professional Biography
                </h2>
                <p className="text-xs text-muted-foreground">
                  Tell prospective patients about your medical background and
                  care philosophy
                </p>
              </div>
            </div>

            <form.Field name="bio">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} className="gap-1.5">
                    <div className="flex items-center justify-between">
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-xs font-medium"
                      >
                        Professional Bio
                      </FieldLabel>
                      <span className="text-[11px] text-muted-foreground font-normal">
                        (Optional)
                      </span>
                    </div>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      rows={3}
                      placeholder="Share your clinical background, areas of special interest, research, and patient care philosophy..."
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="resize-y transition-all focus-visible:ring-primary/20 text-sm leading-relaxed"
                    />
                    <div className="flex items-center justify-between gap-2 pt-0.5">
                      <FieldDescription className="text-xs text-muted-foreground">
                        Displayed on your public profile once approved by the
                        medical board.
                      </FieldDescription>
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {field.state.value.length}/1000
                      </span>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          {/* SECTION 4: Verification Documents */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border/60">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                <FileUp className="size-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-foreground">
                  Verification Documents
                </h2>
                <p className="text-xs text-muted-foreground">
                  Attach your CV and relevant medical certifications for
                  fast-track review
                </p>
              </div>
            </div>

            {/* Resume Upload */}
            <form.Field name="resume">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const file = field.state.value;
                return (
                  <Field data-invalid={isInvalid} className="gap-2">
                    <div className="flex items-center justify-between">
                      <FieldLabel
                        htmlFor="resume-field"
                        className="text-xs font-medium"
                      >
                        Curriculum Vitae / Resume{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <span className="text-xs text-muted-foreground">
                        PDF, DOC, DOCX or Image up to {MAX_FILE_SIZE}MB
                      </span>
                    </div>

                    <input
                      id="resume-field"
                      type="file"
                      className="sr-only"
                      name={field.name}
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        const selected = e.target.files?.[0] ?? null;

                        field.handleChange(selected);
                        e.target.value = "";
                      }}
                    />

                    {!file ? (
                      <label
                        htmlFor="resume-field"
                        className="group flex flex-col items-center justify-center gap-2.5 rounded-xl border-2 border-dashed border-border/80 bg-muted/20 p-6 text-center transition-all duration-150 hover:border-primary/60 hover:bg-primary/[0.03] cursor-pointer"
                      >
                        <div className="flex size-11 items-center justify-center rounded-full bg-background shadow-xs border border-border/60 group-hover:scale-105 group-hover:border-primary/40 transition-transform">
                          <UploadCloud className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            Click to upload your CV / Resume
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Drag & drop or browse from your computer
                          </p>
                        </div>
                      </label>
                    ) : (
                      <div className="flex items-center justify-between gap-3 rounded-xl border border-border/80 bg-muted/30 p-3.5 shadow-xs">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <FileCheck2 className="size-5" />
                          </div>
                          <div className="min-w-0 space-y-0.5">
                            <p className="truncate text-sm font-medium text-foreground">
                              {file.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)}
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="size-2.5" />
                                Ready
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="resume-field"
                            className="inline-flex h-8 items-center justify-center rounded-md border border-border bg-background px-2.5 text-xs font-medium text-foreground shadow-xs hover:bg-muted cursor-pointer transition-colors"
                          >
                            Replace
                          </label>
                          <button
                            type="button"
                            aria-label="Remove resume"
                            onClick={() => {
                              field.handleChange(null);
                              field.handleBlur();
                            }}
                            className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Additional Files Upload */}
            <form.Field name="additionalFiles">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const files = field.state.value;
                return (
                  <Field data-invalid={isInvalid} className="gap-2">
                    <div className="flex items-center justify-between">
                      <FieldLabel
                        htmlFor="additional-file-field"
                        className="text-xs font-medium"
                      >
                        Supporting Documents
                      </FieldLabel>
                      <span className="text-xs text-muted-foreground">
                        {files.length} of {MAX_ADDITIONAL_FILES} attached
                        (Optional)
                      </span>
                    </div>

                    <input
                      id="additional-file-field"
                      type="file"
                      multiple
                      className="sr-only"
                      name={field.name}
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        const incoming = Array.from(e.target.files ?? []);
                        if (incoming.length === 0) return;
                        const combined = [...files, ...incoming].slice(
                          0,
                          MAX_ADDITIONAL_FILES,
                        );

                        field.handleChange(combined);
                        e.target.value = "";
                      }}
                    />

                    {files.length < MAX_ADDITIONAL_FILES && (
                      <div className="flex flex-wrap items-center gap-3">
                        <Button
                          render={<label htmlFor="additional-file-field" />}
                          nativeButton={false}
                          variant="outline"
                          size="sm"
                          className="cursor-pointer gap-1.5 font-medium border-dashed hover:border-primary/50"
                        >
                          <Plus className="size-3.5 text-primary" />
                          Add Certificates / Degrees
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          e.g. BMDC Registration, Postgrad degrees, Experience
                          letters
                        </span>
                      </div>
                    )}

                    {files.length > 0 && (
                      <ul className="grid gap-2 pt-1">
                        {files.map((file, index) => (
                          <li
                            key={`${file.name}-${index}`}
                            className="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-muted/20 px-3 py-2 text-sm"
                          >
                            <span className="flex min-w-0 items-center gap-2.5">
                              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                <FileText className="size-3.5" />
                              </div>
                              <span className="truncate font-medium text-xs sm:text-sm">
                                {file.name}
                              </span>
                              <span className="text-xs text-muted-foreground shrink-0">
                                ({formatFileSize(file.size)})
                              </span>
                            </span>
                            <button
                              type="button"
                              aria-label={`Remove ${file.name}`}
                              onClick={() => {
                                field.handleChange(
                                  files.filter((_, i) => i !== index),
                                );
                                field.handleBlur();
                              }}
                              className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus:outline-none"
                            >
                              <X className="size-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          {/* Submission Bar */}
          <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground text-center sm:text-left leading-relaxed max-w-sm">
              By submitting, you certify that all information and medical
              credentials provided are genuine and subject to verification.
            </p>
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto min-w-44 font-semibold shadow-sm hover:shadow-md transition-all gap-2"
            >
              <span>Submit Application</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </form>
      </CardContent>

      {/* Footer Navigation */}
      <div className="border-t border-border/60 bg-muted/30 p-4 sm:px-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <div>
          Already an approved doctor?{" "}
          <Link
            href="/login"
            className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            Sign in to Doctor Portal
          </Link>
        </div>
        <div>
          Looking for care?{" "}
          <Link
            href="/register"
            className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            Patient Registration
          </Link>
        </div>
      </div>
    </Card>
  );
}
