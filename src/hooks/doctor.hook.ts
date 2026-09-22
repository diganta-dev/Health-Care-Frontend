import {
  applyAsDoctor,
  getAllDoctor,
  verifyDoctorAccount,
} from "@/api/doctor.api";
import { DoctorParams } from "@/types";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";

export function useApplyAsDoctor() {
  return useMutation({
    mutationFn: applyAsDoctor,
  });
}
export function useVerifyDoctorAccount() {
  return useMutation({
    mutationFn: verifyDoctorAccount,
  });
}

export function useGetALlDoctors(params: DoctorParams) {
  return useQuery({
    queryKey: ["doctors",params],
    queryFn: () => getAllDoctor(params),
  });
}
export function useSuspenseGetALlDoctors(params: DoctorParams) {
  return useSuspenseQuery({
    queryKey: ["doctors",params],
    queryFn: () => getAllDoctor(params),
  });
}
