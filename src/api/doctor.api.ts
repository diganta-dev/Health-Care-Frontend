
import apiClient from "@/lib/apiClient";
import { DoctorApplicationPayload, VerifyOTPPayLoad } from "@/types";

export  function applyAsDoctor(payload: DoctorApplicationPayload) {
 const formData = new FormData();
  formData.append("data",JSON.stringify(payload.data))
  payload.resume && formData.append("resume",payload.resume)
  payload.additionalFiles.forEach((file) => {
    formData.append("additionalFiles", file);
  });
  return apiClient("/doctor/apply-as-doctor",{
    method:"POST",
    body:formData
  })
 
}
export function verifyDoctorAccount(payload:VerifyOTPPayLoad){
   return apiClient("/doctor/apply-as-doctor/verify-email",{
    method:"POST",
    body:payload
   })
}


