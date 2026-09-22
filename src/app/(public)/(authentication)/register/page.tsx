import RegisterForm from "@/components/form/register-form";
import { HeartPulse } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <HeartPulse className="size-4" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Health<span className="text-primary">Care</span>
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center py-6 sm:py-8">
          <div className="w-full max-w-xl">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/auth/register.jpg"
          alt="Healthcare register background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
