"use client";
import { useMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { data, isPending, isError } = useMe();
  const router = useRouter();
  const user = data?.data;
  console.log(user);
  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user?.email) {
      router.replace("/login");
    }
  }, [isPending, isError, user]);
  if (isPending) {
    return <AuthLoading />;
  }
  if (isError || !user?.email) {
    return <AuthLoading label="Redirecting to login" />;
  }

  return (
    <div>
      <>{children}</>
    </div>
  );
}
