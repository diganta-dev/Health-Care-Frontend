"use client";

import { Suspense, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { DoctorParams, DoctorVerificationStatus } from "@/types";
import DoctorApprovalTable from "./doctor.approval-table";
import DoctorApprovalLoading from "./doctor-approval-loading";
import DoctorApprovalSheet from "./doctor-approval.sheet";
import { Search, Users, Clock, CheckCircle2, XCircle } from "lucide-react";
import { useDebunce } from "@/hooks/debounce.hook";
import TablePagination from "@/components/ui/table-pagination";

const verificationStatus: ("ALL" | DoctorVerificationStatus)[] = [
  "ALL",
  "PENDING",
  "APPROVED",
  "REJECTED",
];

const STATUS_CONFIG: Record<
  "ALL" | DoctorVerificationStatus,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  ALL: { label: "All", icon: Users },
  PENDING: { label: "Pending", icon: Clock },
  APPROVED: { label: "Approved", icon: CheckCircle2 },
  REJECTED: { label: "Rejected", icon: XCircle },
};

export default function DoctorApprovalTab() {
  const [tab, setTab] = useState<"ALL" | DoctorVerificationStatus>("ALL");
  const [doctorId, setDoctorId] = useState("");
  const [searchInput,setSearchInput] = useState('');
  const debuncedSearch = useDebunce(searchInput,500);
  const [page,setPage]=useState(1)
  const  handleSearch= (e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearchInput(e.target.value);
    setPage(1);
  }

  const queryParams: DoctorParams = {
    page,
    limit: 10,
    ...(tab === "ALL" ? {} : { verificationStatus: tab }),
    ...(debuncedSearch? {searchTerm:debuncedSearch}: {})
  }; 

  return (
    <div className="w-full space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-1 border-b border-border/60 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Doctor Approvals
            </h1>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              Management
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Review doctor applications, verify medical credentials, and manage account approvals.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input onChange={(e)=>handleSearch(e)} 
            type="search"
            placeholder="Search by name, email, contact..."
            className="pl-9 h-10 w-full bg-background/60 shadow-xs"
          />
        </div>

        {/* Status Tabs */}
        <Tabs
          value={tab}
          onValueChange={(val) => setTab(val as "ALL" | DoctorVerificationStatus)}
        >
          <TabsList className="grid grid-cols-4 sm:flex h-10 p-1 bg-muted/80 rounded-lg">
            {verificationStatus.map((status) => {
              const config = STATUS_CONFIG[status];
              const Icon = config.icon;
              return (
                <TabsTrigger
                  key={status}
                  value={status}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium transition-all"
                >
                  <Icon
                    className={
                      status === "PENDING"
                        ? "size-3.5 text-amber-500"
                        : status === "APPROVED"
                        ? "size-3.5 text-emerald-500"
                        : status === "REJECTED"
                        ? "size-3.5 text-rose-500"
                        : "size-3.5 text-muted-foreground"
                    }
                  />
                  <span>{config.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      {/* Table Section */}
      <div className="rounded-xl border border-border/80 bg-card shadow-xs overflow-hidden">
        <Suspense fallback={<DoctorApprovalLoading />}>
          <DoctorApprovalTable {...queryParams} handleReview={setDoctorId} handlePageChange={setPage}/>
        </Suspense>
      </div>
      

      {/* Approval / Rejection Action Sheet */}
      <DoctorApprovalSheet
        doctorId={doctorId}
        {...queryParams}
        onClose={() => setDoctorId("")}
      />
    </div>
  );
}

