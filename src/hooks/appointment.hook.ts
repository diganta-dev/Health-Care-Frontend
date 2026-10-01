import { bookAppointment, getMyAppointments } from "@/api/appointment.api";
import { BookAppointmentPayload } from "@/types/appointment.type";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useBookAppointment(){
    return useMutation({
        mutationFn:bookAppointment
    })
}  


export function useGetMyAppointments(params: {
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: () => getMyAppointments(params),
  });
}