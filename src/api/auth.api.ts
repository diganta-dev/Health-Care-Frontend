import apiClient from "@/lib/apiClient";
import { LoginPayLoad, RegisterPayLoad, VerifyOTPPayLoad } from "@/types/auth.type";

export function userRegister(payload: RegisterPayLoad) {
  return apiClient("/auth/register", { method: "POST", body: payload });
}
export function verifyOTP(payload: VerifyOTPPayLoad) {
  return apiClient("/auth/verify-email", { method: "POST", body: payload });
}
export function userLogin(payload: LoginPayLoad) {
  return apiClient("/auth/login", { method: "POST", body: payload });
}
export function userLogout() {
  return apiClient("/auth/logout", { method: "POST", });
}
export function getMe() {
  return apiClient("/auth/me", { method: "GET", });
}
export function googleOAuth(payload: { idToken: string; }) {
  return apiClient("/auth/google", { method: "POST", body: payload });
}  