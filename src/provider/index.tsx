"use client";
import React from "react";
import { ReactNode } from "react";
import QueryProvider from "./query.provider";
import GoogleAuthProdiver from "./google-auth.prodiver";
import { TooltipProvider } from "@/components/ui/tooltip";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleAuthProdiver>
      <QueryProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryProvider>
    </GoogleAuthProdiver>
  );
};

export default Providers;
