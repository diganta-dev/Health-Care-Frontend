"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DoctorApprovalSheet from "./doctor-approval.sheet";
import { useSuspenseGetALlDoctors } from "@/hooks";
import { Doctor, DoctorParams } from "@/types";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import TablePagination from "@/components/ui/table-pagination";

interface IProps extends DoctorParams {
  handleReview: Dispatch<SetStateAction<string>>,
  handlePageChange: Dispatch<SetStateAction<number>>
}

export default function DoctorApprovalTable({ handleReview, handlePageChange, ...params }: IProps) {
  const { data } = useSuspenseGetALlDoctors(params);

  const doctors = data?.data || [];
  console.log("doctor", doctors);
  return (<>
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>

            <TableHead>License No.</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact No</TableHead>
            <TableHead>Specialization</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors?.map((doctor: Doctor) => (
            <TableRow key={doctor.id}>
              <TableCell className="font-medium">{doctor.name}</TableCell>
              <TableCell>{doctor.licenseNumber}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>
                {doctor.contactNumber ? doctor.contactNumber : "-"}
              </TableCell>
              <TableCell>{doctor.specialization}</TableCell>
              <TableCell className="text-right">
                {
                  doctor.user.emailVerified ? <Button onClick={() => handleReview(doctor.id)} disabled={doctor.verificationStatus === "APPROVED"} variant="outline">Review</Button> : <Button variant="outline" disabled>Not Verified Email</Button>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
    <div className="my=5">
      <TablePagination totalPages={data.meta.totalPages ?? 0} handlePageChange={handlePageChange} page={params.page ?? 0}></TablePagination>
    </div>
  </>
  );
}
