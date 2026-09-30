import { getAllPublicDoctors, getPublicDoctorProfile } from "@/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    BriefcaseBusiness,
    GraduationCap,
    Stethoscope,
    Wallet,
    BadgeCheck,
    CalendarDays,
    ArrowLeft,
    Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
    const limit = 100;
    const data = await getAllPublicDoctors({ limit, page: 1 });
    const totalPages = data?.meta?.totalPages ?? 1;
    const all = [...(data?.data ?? [])];

    for (let i = 2; i <= totalPages; i++) {
        const pageData = await getAllPublicDoctors({ limit, page: i });
        all.push(...(pageData?.data ?? []));
    }

    return all.map((doctor) => ({ id: String(doctor.id) }));
}

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

export default async function DoctorProfilePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const response = await getPublicDoctorProfile(id);
    const doctor = response?.data;

    if (!doctor) return notFound();

    const joinedYear = new Date(doctor.createdAt).getFullYear();
    const yearsActive = Math.max(new Date().getFullYear() - joinedYear, 1);

    const stats = [
        {
            icon: BriefcaseBusiness,
            label: "Experience",
            value: `${doctor.experienceYears}+ yrs`,
            color: "text-sky-600",
            bg: "bg-sky-100",
        },
        {
            icon: CalendarDays,
            label: "Member Since",
            value: String(joinedYear),
            color: "text-violet-600",
            bg: "bg-violet-100",
        },
        {
            icon: Clock,
            label: "Years Active",
            value: `${yearsActive} yr${yearsActive > 1 ? "s" : ""}`,
            color: "text-emerald-600",
            bg: "bg-emerald-100",
        },
        {
            icon: BadgeCheck,
            label: "Status",
            value: "Verified",
            color: "text-amber-600",
            bg: "bg-amber-100",
        },
    ];

    return (
        <div className="min-h-screen bg-muted/30">
            {/* ── Hero Banner ── */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/85 to-primary/60 pb-16 pt-20">
                {/* Decorative circles */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-white/5 blur-2xl" />
                <div className="pointer-events-none absolute right-1/3 top-0 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

                <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
                    {/* Back link */}
                    <Link
                        href="/doctors"
                        className="mb-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to Doctors
                    </Link>

                    {/* Doctor intro row */}
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        {/* Avatar */}
                        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[2rem] bg-white/20 text-4xl font-extrabold tracking-tight text-white shadow-xl ring-4 ring-white/25 backdrop-blur-sm">
                            {getInitials(doctor.name)}
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
                                Dr. {doctor.name}
                            </h1>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                                    <Stethoscope className="h-3.5 w-3.5" />
                                    {doctor.specialization}
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                                    <BadgeCheck className="h-3.5 w-3.5 text-emerald-300" />
                                    Verified Doctor
                                </span>
                            </div>
                            {doctor.licenseNumber && (
                                <p className="text-sm text-white/50">
                                    License: {doctor.licenseNumber}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
                {/* Floating Stats — overlaps hero */}
                <div className="mt-[100px] grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="flex flex-col items-center gap-3 rounded-2xl border border-border/50 bg-white p-5 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", stat.bg)}>
                                <stat.icon className={cn("h-5 w-5", stat.color)} />
                            </div>
                            <div className="text-center">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    {stat.label}
                                </p>
                                <p className="mt-0.5 text-lg font-bold text-foreground">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Two Column ── */}
                <div className="mt-6 grid gap-5 lg:grid-cols-3">
                    {/* Left — content */}
                    <div className="space-y-5 lg:col-span-2">
                        {/* Bio */}
                        {doctor.bio && (
                            <div className="rounded-2xl border bg-white p-7 shadow-sm">
                                <h2 className="mb-4 flex items-center gap-2.5 text-base font-bold text-foreground">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                                        <Stethoscope className="h-4 w-4 text-primary" />
                                    </span>
                                    About the Doctor
                                </h2>
                                <p className="leading-7 text-muted-foreground">{doctor.bio}</p>
                            </div>
                        )}

                        {/* Qualifications */}
                        <div className="rounded-2xl border bg-white p-7 shadow-sm">
                            <h2 className="mb-4 flex items-center gap-2.5 text-base font-bold text-foreground">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10">
                                    <GraduationCap className="h-4 w-4 text-emerald-600" />
                                </span>
                                Qualifications
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {doctor.qualifications.split(",").map((q) => (
                                    <Badge
                                        key={q.trim()}
                                        variant="secondary"
                                        className="rounded-full px-4 py-1.5 text-sm font-medium"
                                    >
                                        {q.trim()}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="rounded-2xl border bg-white p-7 shadow-sm">
                            <h2 className="mb-5 flex items-center gap-2.5 text-base font-bold text-foreground">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10">
                                    <BriefcaseBusiness className="h-4 w-4 text-sky-600" />
                                </span>
                                Experience
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Years of Practice</span>
                                    <span className="text-sm font-bold text-foreground">
                                        {doctor.experienceYears} {doctor.experienceYears === 1 ? "year" : "years"}
                                    </span>
                                </div>
                                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-primary to-sky-400"
                                        style={{
                                            width: `${Math.min(Math.max((doctor.experienceYears / 30) * 100, 4), 100)}%`,
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Practicing since {new Date().getFullYear() - doctor.experienceYears}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right — sidebar */}
                    <div className="space-y-4">
                        {/* Booking card */}
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center justify-between">
                                <h3 className="font-bold text-foreground">Consultation</h3>
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Available
                                </span>
                            </div>

                            {doctor.consultationFee ? (
                                <div className="mb-6">
                                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Fee per visit
                                    </p>
                                    <p className="mt-1.5 text-4xl font-extrabold text-foreground">
                                        ৳{doctor.consultationFee}
                                    </p>
                                </div>
                            ) : (
                                <p className="mb-6 text-sm text-muted-foreground">Contact for fee details</p>
                            )}

                            <button
                                type="button"
                                className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
                            >
                                Book Appointment
                            </button>
                        </div>

                        {/* Quick info */}
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                Quick Info
                            </h3>
                            <ul className="divide-y divide-border">
                                {[
                                    {
                                        icon: Wallet,
                                        label: "Fee",
                                        value: doctor.consultationFee ? `৳${doctor.consultationFee}` : "—",
                                        accent: false,
                                    },
                                    {
                                        icon: BriefcaseBusiness,
                                        label: "Experience",
                                        value: `${doctor.experienceYears} yrs`,
                                        accent: false,
                                    },
                                    {
                                        icon: CalendarDays,
                                        label: "Joined",
                                        value: String(joinedYear),
                                        accent: false,
                                    },
                                    {
                                        icon: BadgeCheck,
                                        label: "Verified",
                                        value: "Yes",
                                        accent: true,
                                    },
                                ].map((item) => (
                                    <li key={item.label} className="flex items-center justify-between py-3">
                                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <item.icon className="h-4 w-4" />
                                            {item.label}
                                        </span>
                                        <span
                                            className={cn(
                                                "text-sm font-semibold",
                                                item.accent ? "text-emerald-600" : "text-foreground",
                                            )}
                                        >
                                            {item.value}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}