"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

const GoogleAuthProdiver = ({ children }: { children: ReactNode }) => {
  const client_id =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ||
    "449820098975-d0ut01ddloo9do6uq6dr2oqt3hbjhnp7.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={client_id}>{children}</GoogleOAuthProvider>
  );
};

export default GoogleAuthProdiver;
