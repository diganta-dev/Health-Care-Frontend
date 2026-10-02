import AppointmentList from "@/components/module/my-appointments/page";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="m-10">
      <h1> My Appointments </h1>
      <Suspense fallback={<p>Loading...</p>}>
        <AppointmentList />
      </Suspense>
    </div>
  );
}