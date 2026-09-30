"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Schedule } from "@/types";
import {
  CalendarDays,
  Clock,
  ExternalLink,
  Users,
  Video,
  CheckCircle2,
  FileEdit,
} from "lucide-react";

interface Props {
  schedule: Schedule;
  open: boolean;
  onClose: () => void;
}

export default function ScheduleDetailSheet({
  schedule,
  open,
  onClose,
}: Props) {
  const isPublished = schedule.status === "PUBLISHED";
  const bookedSlots = schedule.totalSlots - schedule.availableSlots;
  const bookingPercent =
    schedule.totalSlots > 0
      ? Math.round((bookedSlots / schedule.totalSlots) * 100)
      : 0;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        {/* Header */}
        <SheetHeader className="pb-4 border-b">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-base">Schedule Details</SheetTitle>
              <SheetDescription className="text-xs mt-0.5">
                {new Date(schedule.startDateTime).toLocaleDateString(
                  undefined,
                  { dateStyle: "full" },
                )}
              </SheetDescription>
            </div>
          </div>

          {/* Status Badge */}
          <span
            className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
              isPublished
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
            }`}
          >
            {isPublished ? (
              <CheckCircle2 className="h-3 w-3" />
            ) : (
              <FileEdit className="h-3 w-3" />
            )}
            {schedule.status}
          </span>
        </SheetHeader>

        <div className="mt-5 flex flex-col gap-4">
          {/* Time Card */}
          <div className="rounded-lg border bg-muted/40 p-4">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Time
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md border bg-background p-3">
                <p className="text-[11px] text-muted-foreground">Start</p>
                <p className="mt-1 text-sm font-semibold">
                  {new Date(schedule.startDateTime).toLocaleTimeString(
                    undefined,
                    { timeStyle: "short" },
                  )}
                </p>
              </div>
              <div className="rounded-md border bg-background p-3">
                <p className="text-[11px] text-muted-foreground">End</p>
                <p className="mt-1 text-sm font-semibold">
                  {new Date(schedule.endDateTime).toLocaleTimeString(
                    undefined,
                    { timeStyle: "short" },
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Slots Card */}
          <div className="rounded-lg border bg-muted/40 p-4">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              Booking
            </p>
            <div className="flex items-end justify-between mb-2">
              <span className="text-2xl font-bold">
                {bookedSlots}
                <span className="text-sm font-normal text-muted-foreground">
                  /{schedule.totalSlots}
                </span>
              </span>
              <span className="text-sm text-muted-foreground">
                {schedule.availableSlots} slots left
              </span>
            </div>
            {/* Progress bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-border">
              <div
                className={`h-full rounded-full transition-all ${
                  bookingPercent >= 80
                    ? "bg-red-500"
                    : bookingPercent >= 50
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
                style={{ width: `${bookingPercent}%` }}
              />
            </div>
            <p className="mt-1.5 text-right text-[11px] text-muted-foreground">
              {bookingPercent}% booked
            </p>
          </div>

          {/* Meeting Link Card */}
          <div className="rounded-lg border bg-muted/40 p-4">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Video className="h-3.5 w-3.5" />
              Meeting
            </p>
            <a
              href={schedule.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md border bg-background px-3 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
            >
              <ExternalLink className="h-4 w-4 shrink-0" />
              <span className="truncate">{schedule.meetingLink}</span>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}