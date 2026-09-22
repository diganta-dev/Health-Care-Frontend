"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor.approval-table";
import { Suspense, useState } from "react";
import DoctorApprovalLoading from "./doctor-approval-loading";
import { DoctorParams, DoctorVerificationStatus } from "@/types";

const verificationStatus: ("ALL" | DoctorVerificationStatus)[] = [
  "ALL",
  "PENDING",
  "APPROVED",
  "REJECTED",
];

export default function DoctorApprovalTab() {
  const [tab, setTab] = useState<"ALL" | DoctorVerificationStatus>("ALL");
  const queryParams: DoctorParams = {
    page: 1,
    limit: 10,
    ...(tab === "ALL" ? {} : { verificationStatus: tab }),
  };
  return (
    <div className="p-[10px]">
      <div className="flex justify-between my-5 item-center">
        <div>
          <p>Search by name,email,contact no,</p>
          <input
            type="search"
            placeholder="Search "
            className="border border-2 w-[300px] p-2 rounded-lg"
          />
        </div>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            {verificationStatus.map((status) => (
              <TabsTrigger key={status} value={status}>
                {status}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <Suspense fallback={<DoctorApprovalLoading />}>
        <DoctorApprovalTable {...queryParams} />
      </Suspense>
    </div>
  );
}
