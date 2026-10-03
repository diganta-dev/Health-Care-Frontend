import { ofetch } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

if (!BASE_URL) {
  console.warn(
    "[apiClient] NEXT_PUBLIC_API_BASE_URL is not set. All requests will fail.",
  );
}

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
});

export default apiClient;
