"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useApproveDoctor, useGetALlDoctors } from "@/hooks";
import { ApproveDoctorPayload, DoctorParams } from "@/types";
import { useState } from "react";

interface IProps extends DoctorParams {
  doctorId: string;
  onClose: () => void;
}
export default function DoctorApprovalSheet({ doctorId, onClose, ...params }: IProps) {
  const { data } = useGetALlDoctors(params);
  const selectedDoctor = data?.data?.find((doctor) => doctor.id === doctorId);
  const [confirmRejection, setConfirmRejection] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const { mutate: verify, isPending } = useApproveDoctor();
  const handleClose = () => {
    setConfirmRejection(false);
    setRejectionReason("");
    onClose();
  }

  const handleReviewAction = (status: "APPROVED" | "REJECTED") => {
    const reviewData: ApproveDoctorPayload = {
      doctorId: doctorId,
      verificationStatus: status,
      rejectionReason: status === "REJECTED" ? rejectionReason : undefined,


    }
    verify(reviewData, {
      onSuccess: (res: any) => {
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: res?.message || "Something went wrong. Please try again",
            type: "error",
          });
          return;
        }
        toast.add({
          title: "Success",
          description:
            status === "APPROVED"
              ? "Doctor approved successfully"
              : "Doctor rejected successfully",
          type: "success",
        });
        handleClose();
      },
      onError: (err: any) => {
        toast.add({
          title: "Error",
          description: err?.message || "Failed to update doctor status",
          type: "error",
        });
      },
    });
  };

  return (
    <div>
      <Sheet open={!!doctorId} onOpenChange={handleClose}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Review and take action</SheetTitle>
            <SheetDescription>This action cannot be undone.</SheetDescription>
          </SheetHeader>
          <p>Doctor Name {selectedDoctor?.name}  </p>
          <SheetFooter>
            {
              confirmRejection ? (
                <div className="flex flex-col gap-3 w-full">
                  <Textarea
                    placeholder="Enter reason for rejection..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      disabled={!rejectionReason.trim() || isPending}
                      onClick={() => handleReviewAction("REJECTED")}
                      variant="destructive"
                    >
                      {isPending ? "Confirming..." : "Confirm Rejection"}
                    </Button>
                    <Button
                      disabled={isPending}
                      onClick={() => setConfirmRejection(false)}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4 w-full">
                  <Button
                    disabled={isPending}
                    onClick={() => setConfirmRejection(true)}
                    variant="destructive"
                    className="flex-1"
                  >
                    Reject
                  </Button>
                  <Button
                    disabled={isPending}
                    onClick={() => handleReviewAction("APPROVED")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isPending ? "Approving..." : "Approve"}
                  </Button>
                </div>
              )
            }
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
