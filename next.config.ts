import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // "output: export" removed — this project deploys to Vercel (Node runtime).
  // Static-export mode mandates every dynamic route be pre-generated at build
  // time, which crashes CI whenever the backend API is temporarily unreachable.
  env: {
    // Bake the API URL into every build worker so it is available even before
    // process.env is fully hydrated in forked child processes.
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ??
      "https://healthcare-backend-omega-five.vercel.app/api/v1",
  },
};

export default nextConfig;
