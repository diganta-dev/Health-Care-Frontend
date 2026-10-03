import { ofetch } from "ofetch";

const getBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (url) return url;

  return "https://healthcare-backend-omega-five.vercel.app/api/v1";
};

const apiClient = ofetch.create({
  baseURL: getBaseUrl(),
  credentials: "include",
  retry: 2,
  retryDelay: 500,
});

export default apiClient;
