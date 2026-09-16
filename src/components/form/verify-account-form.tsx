"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Loader2, RefreshCw, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "@/components/ui/toast"
import { cn } from "cn"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useVerifyAccount } from "@/hooks"

export function VerifyAccountForm() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const [otp, setOtp] = useState("")
  const [countdown, setCountdown] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const { mutate: verifyAccount, isPending: verifyPending } = useVerifyAccount()
  const router = useRouter()

  // Countdown timer for resend code
  useEffect(() => {
    if (countdown <= 0) return
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [countdown])

  const handleOTP = async (e?: React.FormEvent) => {
    
    
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    if (!email) {
      toast.add({
        title: "Missing Email",
        description: "No email address found to verify. Please register or try again.",
        type: "error",
      })
      return
    }

    if (otp.length < 6) {
      toast.add({
        title: "Incomplete Code",
        description: "Please enter the full 6-digit verification code.",
        type: "error",
      })
      return
    }

    const verifyPayload = {
      email,
      otp,
    }

    verifyAccount(verifyPayload, {
      onSuccess: () => {
        toast.add({
          title: "Account Verified",
          description: "Your account has been verified successfully.",
          type: "success",
        })
        router.push("/")
      },
      onError: (error) => {
        toast.add({
          title: "Verification Failed",
          description: error.message || "Invalid or expired verification code. Please try again.",
          type: "error",
        })
      },
    })
  }

  const handleResend = async () => {
    if (countdown > 0 || isResending) return

    if (!email) {
      toast.add({
        title: "Missing Email",
        description: "No email address found to resend code to.",
        type: "error",
      })
      return
    }

    setIsResending(true)
    try {
      toast.add({
        title: "Code Resent",
        description: `A new verification code was sent to ${email}.`,
        type: "success",
      })
      setCountdown(60)
    } catch {
      toast.add({
        title: "Failed to Resend",
        description: "Could not send verification code. Please try again later.",
        type: "error",
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Card className="w-full border-border/80 shadow-md">
      {/* Card Header */}
      <CardHeader className="text-center pb-4 space-y-2">
        <div className="mx-auto mb-1 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5">
          <ShieldCheck className="size-6" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">
          Verify Your Account
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
          Enter the 6-digit verification code sent to{" "}
          <br className="hidden sm:inline" />
          {email ? (
            <span className="font-semibold text-foreground break-all">{email}</span>
          ) : (
            <span className="font-medium text-foreground">your email address</span>
          )}
        </CardDescription>
      </CardHeader>

      {/* Card Body */}
      <CardContent className="space-y-6">
        <form
          id="otp-form"
          onSubmit={handleOTP}
          className="flex flex-col items-center space-y-6"
        >
          {/* OTP Input Fields */}
          <div className="flex flex-col items-center gap-3 w-full">
            <InputOTP
              maxLength={6}
              value={otp} autoComplete="off"
              onChange={(value) => setOtp(value)}
              id="otp-verification"
              autoFocus
              containerClassName="justify-center" 
              pattern={REGEXP_ONLY_DIGITS} 
            >
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  className="size-10 sm:size-12 text-lg sm:text-xl font-bold"
                />
                <InputOTPSlot
                  index={1}
                  className="size-10 sm:size-12 text-lg sm:text-xl font-bold"
                />
                <InputOTPSlot
                  index={2}
                  className="size-10 sm:size-12 text-lg sm:text-xl font-bold"
                />
              </InputOTPGroup>
              <InputOTPSeparator className="mx-1 sm:mx-2 text-muted-foreground/50" />
              <InputOTPGroup>
                <InputOTPSlot
                  index={3}
                  className="size-10 sm:size-12 text-lg sm:text-xl font-bold"
                />
                <InputOTPSlot
                  index={4}
                  className="size-10 sm:size-12 text-lg sm:text-xl font-bold"
                />
                <InputOTPSlot
                  index={5}
                  className="size-10 sm:size-12 text-lg sm:text-xl font-bold"
                />
              </InputOTPGroup>
            </InputOTP>

            <p className="text-xs text-muted-foreground text-center">
              Enter the 6 digits displayed in the message
            </p>
          </div>

          {/* Resend Code Section */}
          <div className="flex w-full items-center justify-between rounded-lg bg-muted/50 px-3.5 py-2.5 text-xs text-muted-foreground">
            <span>Didn&apos;t receive the code?</span>
            <button
              type="button"
              disabled={countdown > 0 || isResending}
              onClick={handleResend}
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline underline-offset-4 disabled:pointer-events-none disabled:opacity-50 transition-colors"
            >
              <RefreshCw
                className={cn("size-3", isResending && "animate-spin")}
              />
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend code"}
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            form="otp-form"
            className="w-full h-10 text-sm font-semibold transition-all shadow-sm"
            disabled={otp.length < 6 || verifyPending}
          >
            {verifyPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Verify Account
                <ArrowRight className="ml-2 size-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="flex flex-col items-center justify-center gap-3 border-t border-border/60 pt-4 pb-6 text-center text-sm text-muted-foreground">
        <p className="text-xs text-muted-foreground">
          Wrong email address?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline underline-offset-4"
          >
            Change email
          </Link>
        </p>
        <Link
          href="/login"
          className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
        >
          &larr; Back to login
        </Link>
      </CardFooter>
    </Card>
  )
}