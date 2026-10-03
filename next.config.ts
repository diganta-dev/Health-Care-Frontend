import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // "output: export" removed — this project deploys to Vercel (Node runtime).
  // Static-export mode mandates every dynamic route be pre-generated at build
  // time, which crashes CI whenever the backend API is temporarily unreachable.
  env: {
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ??
      "https://healthcare-backend-omega-five.vercel.app/api/v1",
    NEXT_PUBLIC_GOOGLE_CLIENT_ID:
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ??
      "449820098975-d0ut01ddloo9do6uq6dr2oqt3hbjhnp7.apps.googleusercontent.com",
  },
};

export default nextConfig;
