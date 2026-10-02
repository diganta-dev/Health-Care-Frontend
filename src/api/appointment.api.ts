import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types";
import { Appointment, BookAppointmentPayload, BookAppointmentResponse } from "@/types/appointment.type";

export function bookAppointment(payload: BookAppointmentPayload) {
    return apiClient<ApiResponse<BookAppointmentResponse>>("/appointment/book-appointment", {
        method: "POST",
        body: payload
    })
}

export function getMyAppointments(params: { page?: number; limit?: number }) {
    return apiClient<ApiResponse<{ appointments: Appointment[] }>>("/appointment/my-appointments", {
        params,
    });
}