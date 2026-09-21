import AuthGuard from "@/components/auth/auth-guard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div>Generec Dashboard Layout</div>
            <AuthGuard>{children}</AuthGuard>
        </div>
    );
}
   