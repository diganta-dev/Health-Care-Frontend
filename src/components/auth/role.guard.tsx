"use client";
import { useMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";
import { UserRole } from "@/types";
import AccessDenied from "./access-denied";
interface IProps {
  children: ReactNode;
  roles: UserRole[];
}

export default function RoleGuard({ children, roles }: IProps) {
  const { data, isPending, isError } = useMe();
  const router = useRouter();
  const user = data?.data;
  const isAuthorized = !!user && roles.includes(user.role);
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
  if (isAuthorized) {
    return <>{children}</>;
  }

  return (
    <>
      <AccessDenied />
    </>
  );
}
