import {
  getMe,
  googleOAuth,
  userLogin,
  userLogout,
  userRegister,
  verifyOTP,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

export const useRegister = () => {
  return useMutation({
    mutationFn: userRegister,
  });
};
export const useVerifyAccount = () => {
  return useMutation({
    mutationFn: verifyOTP,
  });
};
export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};
export const useGoogleOAuth = () => {
  return useMutation({
    mutationFn: googleOAuth,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: userLogout,
  });
};
export const useMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
};
