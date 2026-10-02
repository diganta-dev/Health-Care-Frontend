"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function DoctorApprovalLoading() {
  return (
    <div className="p-[10px]">
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
            {[1, 2, 3, , 4, 5, 6, 7, 8, 9].map((i) => (
              <TableRow key={i}>
                <TableCell colSpan={6} className="text-center">
                  <Skeleton className="h-5 w-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
