import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center gap-3 p-4 rounded-lg border border-rose-500 bg-rose-50">
        <ShieldAlert className="w-12 h-12 text-rose-600" />
        <div>
          <h1 className="text-xl font-semibold text-rose-900">Access Denied</h1>
          <p className="text-rose-700 text-sm">
            You do not have permission to access this page
          </p>
          <Link href="/">Go back to home</Link>
        </div>
      </div>
    </div>
  );
}
