import { getMe, googleOAuth, userLogin, userLogout } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

export const useLogin = () => {
  return useMutation({
    mutationFn:userLogin,
  })
};
export const useGoogleOAuth = () => {
  return useMutation({
    mutationFn: googleOAuth,
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: userLogout,
  })
};
export const useMe = () => {
  return useQuery({
    queryKey:['user'],
    queryFn: getMe,
    retry:false
  })
};
