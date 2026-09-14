import { userLogin } from "@/api";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export const useLogin = () => {
  return useMutation({
    mutationFn:userLogin,
  })
};

export default useLogin;   