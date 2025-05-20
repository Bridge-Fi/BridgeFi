"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { UserAPI } from "@/app/api/UserAPI";

interface Appointment {
  id: number;
  appointmentDate: string; // ISO string
  createdAt: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  lawyer: { id: number; fullName: string };
  inquiry: string;
}

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    (async () => {
      const data = await UserAPI.getMyAppointments();
      if (!(data instanceof Error)) {
        data.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setAppointments(data);
      }
      setLoading(false);
    })();
  }, []);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "Invalid date";
    return d.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusClasses: Record<string, string> = {
    pending: "bg-yellow-600 text-white",
    confirmed: "bg-green-200 text-green-800",
    cancelled: "bg-red-600 text-white",
    completed: "bg-transparent text-gray-800",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">My Appointments</h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {appointments.length === 0 && (
            <p className="col-span-full text-center text-gray-600">
              You have no appointments.
            </p>
          )}

          {appointments.map((appt, index) => (
            <Card
              key={appt.id}
              className="shadow-md flex flex-col justify-between min-h-[360px] overflow-visible"
            >
              <CardHeader>
                <CardTitle>
                  Appointment #{appointments.length - index}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {formatDate(appt.appointmentDate)}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col h-full">
                <div className="flex-grow">
                  <p>
                    <strong>Lawyer:</strong> {appt.lawyer.fullName}
                  </p>

                  <p className="mt-2 mb-4">
                    <strong>Inquiry:</strong>{" "}
                    <span
                      className={`inline ${
                        expanded[appt.id] ? "" : "line-clamp-3"
                      }`}
                    >
                      {appt.inquiry}
                    </span>
                    {appt.inquiry.length > 150 && (
                      <button
                        className="text-blue-600 hover:underline text-sm ml-1"
                        onClick={() =>
                          setExpanded((prev) => ({
                            ...prev,
                            [appt.id]: !prev[appt.id],
                          }))
                        }
                      >
                        {expanded[appt.id] ? "Show less" : "Show more"}
                      </button>
                    )}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t flex items-center justify-between">
                  <strong>Status:</strong>
                  <span
                    className={`px-2 py-1 rounded ${
                      statusClasses[appt.status]
                    }`}
                  >
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                  {appt.status === "completed" && (
                    <input
                      type="checkbox"
                      checked
                      disabled
                      className="h-5 w-5"
                      aria-label="Completed"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
