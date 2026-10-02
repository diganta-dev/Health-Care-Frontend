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
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import DoctorBooking from "@/components/module/doctors/doctor-booking";

export const dynamicParams = true;

export async function generateStaticParams() {
    try {
        const limit = 100;
        const data = await getAllPublicDoctors({ limit, page: 1 });
        const totalPages = data?.meta?.totalPages ?? 1;
        const all = [...(data?.data ?? [])];

        for (let i = 2; i <= totalPages; i++) {
            const pageData = await getAllPublicDoctors({ limit, page: i });
            all.push(...(pageData?.data ?? []));
        }

        return all.map((doctor) => ({ id: String(doctor.id) }));
    } catch {
        return [];
    }
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

    if (!id || id === "undefined") return notFound();

    let doctor;
    try {
        const response = await getPublicDoctorProfile(id);
        doctor = response?.data;
    } catch {
        return notFound();
    }

    if (!doctor) return notFound();

    const joinedYear = new Date(doctor.createdAt).getFullYear();
    const yearsActive = Math.max(new Date().getFullYear() - joinedYear, 1);
    const practicingSince = new Date().getFullYear() - doctor.experienceYears;
    const expPercent = Math.min(Math.max((doctor.experienceYears / 30) * 100, 4), 100);

    return (
        <div className="min-h-screen bg-background">
            {/* Top nav bar */}
            <div className="border-b border-border bg-background">
                <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
                    <Link
                        href="/doctors"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Doctors
                    </Link>
                </div>
            </div>

            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

                {/* Profile Header Card */}
                <Card className="mb-6">
                    <CardContent className="p-6 sm:p-8">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                            {/* Avatar */}
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
                                {getInitials(doctor.name)}
                            </div>

                            {/* Name + badges */}
                            <div className="flex-1 space-y-2.5">
                                <div>
                                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                        Dr. {doctor.name}
                                    </h1>
                                    <p className="mt-0.5 text-sm text-muted-foreground">
                                        {doctor.specialization} &middot; Practicing since {practicingSince}
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge variant="secondary" className="gap-1.5">
                                        <Stethoscope className="h-3 w-3" />
                                        {doctor.specialization}
                                    </Badge>
                                    <Badge className="gap-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                                        <BadgeCheck className="h-3 w-3" />
                                        Verified
                                    </Badge>
                                    {doctor.licenseNumber && (
                                        <span className="text-xs text-muted-foreground">
                                            License: {doctor.licenseNumber}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Fee — desktop only */}
                            {doctor.consultationFee && (
                                <div className="hidden flex-col items-end sm:flex">
                                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                        Fee per visit
                                    </span>
                                    <span className="mt-0.5 text-3xl font-bold text-foreground">
                                        &#2547;{doctor.consultationFee}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Stats row */}
                        <Separator className="my-6" />
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {[
                                { icon: BriefcaseBusiness, label: "Experience", value: `${doctor.experienceYears} yrs` },
                                { icon: CalendarDays, label: "Member Since", value: String(joinedYear) },
                                { icon: Clock, label: "Years Active", value: `${yearsActive} yr${yearsActive > 1 ? "s" : ""}` },
                                { icon: BadgeCheck, label: "Status", value: "Verified" },
                            ].map((stat) => (
                                <div key={stat.label} className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-muted-foreground">
                                        <stat.icon className="h-3.5 w-3.5" />
                                        <span className="text-xs font-medium uppercase tracking-wider">
                                            {stat.label}
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Two column layout */}
                <div className="grid gap-5 lg:grid-cols-3">

                    {/* Left — Tabs */}
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="about">
                            <TabsList className="mb-4 w-full justify-start">
                                <TabsTrigger value="about">About</TabsTrigger>
                                <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
                                <TabsTrigger value="experience">Experience</TabsTrigger>
                            </TabsList>

                            {/* About tab */}
                            <TabsContent value="about">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            About
                                        </CardTitle>
                                    </CardHeader>
                                    <Separator />
                                    <CardContent className="pt-5">
                                        {doctor.bio ? (
                                            <p className="text-sm leading-7 text-muted-foreground">
                                                {doctor.bio}
                                            </p>
                                        ) : (
                                            <p className="text-sm italic text-muted-foreground">
                                                No biography provided.
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Qualifications tab */}
                            <TabsContent value="qualifications">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Qualifications
                                        </CardTitle>
                                    </CardHeader>
                                    <Separator />
                                    <CardContent className="pt-5">
                                        <div className="flex flex-wrap gap-2">
                                            {doctor.qualifications.split(",").map((q) => (
                                                <Badge
                                                    key={q.trim()}
                                                    variant="secondary"
                                                    className="gap-1.5 rounded-md px-3 py-1 text-sm"
                                                >
                                                    <GraduationCap className="h-3.5 w-3.5" />
                                                    {q.trim()}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Experience tab */}
                            <TabsContent value="experience">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Experience
                                        </CardTitle>
                                    </CardHeader>
                                    <Separator />
                                    <CardContent className="space-y-5 pt-5">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">Years of practice</span>
                                                <span className="font-semibold text-foreground">
                                                    {doctor.experienceYears}{" "}
                                                    {doctor.experienceYears === 1 ? "year" : "years"}
                                                </span>
                                            </div>
                                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                                <div
                                                    className="h-full rounded-full bg-primary"
                                                    style={{ width: `${expPercent}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Practicing since {practicingSince}
                                            </p>
                                        </div>

                                        <Separator />

                                        <div className="flex flex-wrap gap-2">
                                            {doctor.experienceYears >= 1 && (
                                                <Badge variant="outline" className="rounded-md text-xs">
                                                    1+ Year
                                                </Badge>
                                            )}
                                            {doctor.experienceYears >= 5 && (
                                                <Badge variant="outline" className="rounded-md text-xs">
                                                    5+ Years
                                                </Badge>
                                            )}
                                            {doctor.experienceYears >= 10 && (
                                                <Badge variant="outline" className="rounded-md text-xs">
                                                    Senior
                                                </Badge>
                                            )}
                                            {doctor.experienceYears >= 20 && (
                                                <Badge variant="outline" className="rounded-md text-xs">
                                                    Veteran
                                                </Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Right — Sidebar */}
                    <div className="space-y-4">

                        {/* Booking card */}
                        <Card>
                            <CardContent className="p-5">
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="text-sm font-semibold text-foreground">
                                        Consultation
                                    </span>
                                    <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        Available
                                    </span>
                                </div>

                                {doctor.consultationFee ? (
                                    <div className="mb-4">
                                        <p className="text-xs text-muted-foreground">Fee per visit</p>
                                        <p className="mt-0.5 text-2xl font-bold text-foreground">
                                            &#2547;{doctor.consultationFee}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="mb-4 text-sm text-muted-foreground">
                                        Contact for fee
                                    </p>
                                )}

                                <DoctorBooking doctorId={doctor.id}></DoctorBooking>
                            </CardContent>
                        </Card>

                        {/* Quick info card */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Quick Info
                                </CardTitle>
                            </CardHeader>
                            <Separator />
                            <CardContent className="pt-0">
                                <ul>
                                    {[
                                        {
                                            icon: Wallet,
                                            label: "Fee",
                                            value: doctor.consultationFee
                                                ? `\u09F3${doctor.consultationFee}`
                                                : "\u2014",
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
                                    ].map((item, i, arr) => (
                                        <li
                                            key={item.label}
                                            className={cn(
                                                "flex items-center justify-between py-3",
                                                i < arr.length - 1 && "border-b border-border",
                                            )}
                                        >
                                            <span className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <item.icon className="h-4 w-4 shrink-0" />
                                                {item.label}
                                            </span>
                                            <span
                                                className={cn(
                                                    "text-sm font-medium",
                                                    item.accent
                                                        ? "text-emerald-600"
                                                        : "text-foreground",
                                                )}
                                            >
                                                {item.value}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
