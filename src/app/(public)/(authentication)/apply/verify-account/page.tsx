import Logo from "@/assets/svg/Logo";
import { VerifyAccountForm } from "@/components/form/verify-account-form";
import { CheckCircle2, Lock, ShieldCheck, Stethoscope } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function VerifyDoctorAccountPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left Column: Form & Brand */}
      <div className="relative flex flex-col justify-between p-6 sm:p-10 bg-gradient-to-b from-background via-background to-muted/20 overflow-hidden">
        {/* Subtle decorative background ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 -left-28 size-96 rounded-full bg-primary/5 blur-3xl"
        />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 font-semibold transition-opacity hover:opacity-90"
          >
            <div className="transition-transform group-hover:scale-105">
              <Logo />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground">
                PH <span className="text-primary">Healthcare</span>
              </span>
              <span className="text-[11px] font-medium tracking-wide uppercase text-muted-foreground">
                Doctor Portal
              </span>
            </div>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <ShieldCheck className="size-3.5 text-primary" />
            Secure Verification
          </span>
        </div>

        {/* Center: OTP Verification Card */}
        <div className="relative z-10 my-auto flex items-center justify-center py-8">
          <div className="w-full max-w-md">
            <Suspense
              fallback={
                <div className="flex h-72 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-border/60 bg-card/80 p-8 shadow-sm">
                  <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <p className="text-xs text-muted-foreground font-medium animate-pulse">
                    Loading verification details...
                  </p>
                </div>
              }
            >
              <VerifyAccountForm mode="doctor" />
            </Suspense>
          </div>
        </div>

        {/* Bottom Footer Notes */}
        <div className="relative z-10 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} PH Healthcare Systems. All rights
          reserved.
        </div>
      </div>

      {/* Right Column: Hero Visual & Social Proof Showcase */}
      <div className="relative hidden lg:block overflow-hidden bg-slate-950">
        {/* Hero Background Image */}
        <img
          src="/auth/login.jpg"
          alt="Healthcare Medical Practitioner"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />

        {/* Layered Gradient Overlays for Readability & Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/25" />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />

        {/* Content Floating Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          {/* Top Pill */}
          <div className="flex justify-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium backdrop-blur-md shadow-sm">
              <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Practitioner Network</span>
            </div>
          </div>

          {/* Bottom Card / Showcase */}
          <div className="space-y-6 max-w-lg">
            {/* Tagline */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-lg bg-primary/20 px-2.5 py-1 text-xs font-semibold text-sky-200 border border-primary/30">
                <Stethoscope className="size-3.5" />
                Specialist Onboarding
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white lg:text-3xl leading-snug">
                Connect with Patients, Transform Lives
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Join our trusted platform of certified healthcare professionals
                providing comprehensive digital and clinical care nationwide.
              </p>
            </div>

            {/* Testimonial / Trust Card */}
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md shadow-2xl space-y-3">
              <p className="text-xs text-slate-200 italic leading-relaxed">
                &ldquo;The verification process is seamless, giving our clinical
                team the security and speed needed to onboard new specialists
                with complete confidence.&rdquo;
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center font-bold text-white shadow-inner">
                    SJ
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      Dr. Sarah Jenkins, MD
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Chief Medical Officer
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-medium text-[11px]">
                  <CheckCircle2 className="size-3.5" />
                  Verified Doctor
                </div>
              </div>
            </div>

            {/* Micro Badges */}
            <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-sky-400" />
                HIPAA Compliant
              </span>
              <span className="size-1 rounded-full bg-slate-600" />
              <span className="inline-flex items-center gap-1.5">
                <Lock className="size-3.5 text-sky-400" />
                End-to-End Encrypted
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
