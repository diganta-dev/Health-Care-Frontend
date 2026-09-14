"use client";

import { useForm } from "@tanstack/react-form";
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
import { loginSchema } from "@/validation";
import { useGoogleOAuth, useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { GoogleLogin } from "@react-oauth/google";


export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {mutate:login,isPending:loginPending} = useLogin()
  const {mutate:googleLogin}=useGoogleOAuth()
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      email: "superadmin@gmail.com",
      password: "superAdmin33#",
    },
    validators: {
      onChange: loginSchema,
      onBlur: loginSchema,
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData={
        email:value.email,
        password:value.password
      }

      login(loginData,{
        onSuccess:(res)=>{
          toast.add({
         title: "Login Successfully",
         description: "Welcome back ",
         type:"success"
})
          router.push('/')
        },
        onError:(error)=>{
          toast.add({
         title: "Login Failed",
         description:error.message || "Please check your email and password",
         type:"error"
})
        }
      }, 
    )


      
    },
  });
  
const handleGoogleSuccess = (credetialResponse:{credential?:string}) => {
  const {credential}=credetialResponse
  if(!credential){
    toast.add({
      title:"Google login failed",
      description:"Something went wrong",
      type:"error"
    })
    return
  }

  googleLogin({idToken:credential},{
    onSuccess:(res)=>{
      toast.add({
        title:"Google login successfull",
        description:"Welcome back",
        type:"success"
      })
      router.push('/')
    },
    onError:(error)=>{
      toast.add({
        title:"Google login failed",
        description:error.message || "Please try again",
        type:"error"
      })
    }
  })
  
}

const handleGoogleError = () => {
  toast.add({
    title:"Google login failed",
    description:"Something went wrong",
    type:"error"
  })
  
  
}

  return (
    <Card className="w-full border-border/80 shadow-md">
      {/* Card Header */}
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
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

            {/* Password Field */}
            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid} className="gap-1.5">
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-primary hover:underline underline-offset-4 font-medium transition-colors"
                      >
                        Forgot password?
                      </Link>
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

            {/* Submit Button */}
            <Button
              disabled={loginPending}
              type="submit"
              className="w-full h-10 font-medium shadow-xs gap-2 group transition-all mt-1"
            >
              <span>{loginPending ? "Logging in..." : "Sign In"}</span>
              {loginPending ? (
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
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            shape="pill"
            size="large"
            width="280" 
          />
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="justify-center pt-2 pb-6">
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline underline-offset-4"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
