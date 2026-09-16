"use client";

import { useForm } from "@tanstack/react-form";
import type z from "zod";
import { ArrowRight, Eye, EyeClosed, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "../ui/field";
import { Input } from "../ui/input";
import { loginSchema, registerSchema } from "@/validation";
import { useGoogleOAuth, useLogin, useRegister } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleLoginButton } from "../module/google-login/GoogleLoin";


export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { mutate: register, isPending: registerPending } = useRegister()
    const { mutate: googleLogin } = useGoogleOAuth()
    const router = useRouter()

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            patient: {
                contactNumber: "",
            },
        } as z.input<typeof registerSchema>,
        validators: {
            onChange: registerSchema,
            onBlur: registerSchema,
            onSubmit: registerSchema,
        },
        onSubmit: ({ value }) => {
            const registerData = {
                name: value.name,
                email: value.email,
                password: value.password,
                patient: {
                    contactNumber: value.patient?.contactNumber,
                },
            }

            register(registerData, {
                onSuccess: (res) => {
                    toast.add({
                        title: "Verify Your Email Address",
                        description: "We have sent a verification code to your email address.",
                        type: "success",
                    });
                    const params = new URLSearchParams({ email: registerData.email });

                    router.push(`/register/verify-account?${params.toString()}`);
                },
                onError: (error) => {
                    toast.add({
                        title: "Registration Failed",
                        description:
                            error.message || "Please check your information and try again",
                        type: "error",
                    });
                },
            },
            )



        },
    });



    return (
        <Card className="w-full border-border/80 shadow-md">
            {/* Card Header */}
            <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Create an account
                </CardTitle>
                <CardDescription>
                    Enter your details below to create your account
                </CardDescription>
            </CardHeader>

            {/* Card Body */}
            <CardContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    <FieldGroup className="gap-4">

                        <form.Field name="name">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid} className="gap-1.5">
                                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="text"
                                            autoCapitalize="words"
                                            autoCorrect="on"
                                            placeholder="Enter Your Name"
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            value={field.state.value}
                                            aria-invalid={isInvalid}
                                            className="h-10 text-sm transition-all focus-visible:ring-primary/20"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>
                        {/* Email Field */}
                        <form.Field name="email">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid} className="gap-1.5">
                                        <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="email"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            placeholder="doctor@healthcare.com"
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            value={field.state.value}
                                            aria-invalid={isInvalid}
                                            className="h-10 text-sm transition-all focus-visible:ring-primary/20"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Phone / Contact Number Field */}
                        <form.Field name="patient.contactNumber">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid} className="gap-1.5">
                                        <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="tel"
                                            placeholder="01700000000"
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            value={field.state.value}
                                            aria-invalid={isInvalid}
                                            className="h-10 text-sm transition-all focus-visible:ring-primary/20"
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Password Field */}
                        <form.Field name="password">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid} className="gap-1.5">
                                        <div className="flex items-center justify-between">
                                            <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                                        </div>
                                        <div className="relative">
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                value={field.state.value}
                                                aria-invalid={isInvalid}
                                                className="h-10 pr-10 text-sm transition-all focus-visible:ring-primary/20"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                aria-label={
                                                    showPassword ? "Hide password" : "Show password"
                                                }
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                            >
                                                {showPassword ? (
                                                    <EyeClosed className="size-4" />
                                                ) : (
                                                    <Eye className="size-4" />
                                                )}
                                            </button>
                                        </div>
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Confirm Password Field */}
                        <form.Field name="confirmPassword">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid} className="gap-1.5">
                                        <FieldLabel htmlFor={field.name}>
                                            Confirm Password
                                        </FieldLabel>
                                        <div className="relative">
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                value={field.state.value}
                                                aria-invalid={isInvalid}
                                                className="h-10 pr-10 text-sm transition-all focus-visible:ring-primary/20"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword((prev) => !prev)
                                                }
                                                aria-label={
                                                    showConfirmPassword
                                                        ? "Hide confirm password"
                                                        : "Show confirm password"
                                                }
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeClosed className="size-4" />
                                                ) : (
                                                    <Eye className="size-4" />
                                                )}
                                            </button>
                                        </div>
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Submit Button */}
                        <Button
                            disabled={registerPending}
                            type="submit"
                            className="w-full h-10 font-medium shadow-xs gap-2 group transition-all mt-1"
                        >
                            <span>{registerPending ? "Registering..." : "Register"}</span>
                            {registerPending ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                            )}
                        </Button>
                    </FieldGroup>
                </form>

                {/* Divider */}
                <FieldSeparator className="my-5">Or continue with</FieldSeparator>

                {/* Google Login */}
                <div className="flex justify-center w-full">
                    <GoogleLoginButton></GoogleLoginButton>
                </div>
            </CardContent>

            {/* Card Footer */}
            <CardFooter className="justify-center pt-2 pb-6">
                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-primary hover:underline underline-offset-4"
                    >
                        Login
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
