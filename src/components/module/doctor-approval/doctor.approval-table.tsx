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

interface IProps extends DoctorParams {}

export default function DoctorApprovalTable(params: IProps) {
  const { data } = useSuspenseGetALlDoctors(params);

  const doctors = data?.data || [];
  console.log("doctor", doctors);
  return (
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
                <DoctorApprovalSheet />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
