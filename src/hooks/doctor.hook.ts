import {
  applyAsDoctor,
  approveDoctor,
  getAllDoctor,
  getAllPublicDoctors,
  getPublicDoctorProfile,
  getTodayScheduleByDoctor,
  verifyDoctorAccount,
} from "@/api/doctor.api";
import { DoctorParams, PublicDoctorParams } from "@/types";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

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
export function useGetAllPublicDoctors(params: PublicDoctorParams) {
  return useQuery({
    queryKey: ["doctor", "public", params],
    queryFn: () => getAllPublicDoctors(params),
  });
}

export function useSuspenseGetPublicDoctors(params: PublicDoctorParams) {
  return useSuspenseQuery({
    queryKey: ["doctors", "public", params],
    queryFn: () => getAllPublicDoctors(params),
  });
}

export function usePublicDoctorProfile(doctorId: string) {
  return useQuery({
    queryKey: ["doctor", "public", doctorId],
    queryFn: () => getPublicDoctorProfile(doctorId),
    enabled: !!doctorId,
  });
}
export function useSuspenseGetALlDoctors(params: DoctorParams) {
  return useSuspenseQuery({
    queryKey: ["doctors",params],
    queryFn: () => getAllDoctor(params),
  });
}
export function useApproveDoctor(){
  const queryClient =useQueryClient();
  return useMutation({
    mutationFn:approveDoctor,
    onSuccess:()=>{
       queryClient.invalidateQueries({
        queryKey: ["doctors"],
       })
    }
  })

}

export function useGetTodayScheduleByDoctor(params: {
  doctorId?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["schedule", params],
    queryFn: () => getTodayScheduleByDoctor(params),
  });
}
  
