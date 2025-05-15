// app/lawyer/appointments/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LawyerApi } from "@/app/api/LawyerApi";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: number;
  user_id: number;
  lawyer_id: number;
  appointment_date: string; // our normalized ISO string
  status: "pending" | "accepted" | "rejected" | "completed";
  clientName: string;
  clientEmail: string;
  inquiry: string;
}

export default function LawyerAppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const user = await LawyerApi.getLoggedUser();
        if (user instanceof Error || user.role !== "lawyer") {
          router.push("/lawyer-login");
          return;
        }

        const raw = await LawyerApi.getAppointmentsByLawyer(user.sub);
        console.log("RAW APPOINTMENTS:", raw);

        if (raw instanceof Error) {
          setError("Failed to load appointments.");
        } else {
          const normalized: Appointment[] = raw.map((a: any) => ({
            id: a.id,
            user_id: a.user_id,
            lawyer_id: a.lawyer_id,
            appointment_date: a.appointmentDate,
            status: a.status,
            clientName:
              a.user?.firstName && a.user?.lastName
                ? `${a.user.firstName} ${a.user.lastName}`
                : "N/A",
            clientEmail: a.user?.email ?? "N/A",
            inquiry: a.inquiry ?? "No inquiry provided",
          }));

          // Sort in descending order (newest first)
          normalized.sort((a, b) => b.id - a.id);

          setAppointments(normalized);
        }
      } catch {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [router]);

  const updateStatus = async (
    apptId: number,
    newStatus: "accepted" | "rejected"
  ) => {
    await LawyerApi.updateAppointmentStatus(apptId, newStatus);
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === apptId
          ? {
              ...a,
              status: newStatus,
            }
          : a
      )
    );
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Your Appointments</h1>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {appointments.length === 0 && (
            <p className="col-span-full text-center text-gray-600">
              No appointments yet.
            </p>
          )}

          {appointments.map((appt, index) => (
            <Card
              key={appt.id}
              className="shadow-md flex flex-col justify-between h-full"
            >
              <CardHeader>
                <CardTitle>
                  Appointment #{appointments.length - index}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {formatDate(appt.appointment_date)}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <div className="flex-grow">
                  <p>
                    <strong>Client:</strong> {appt.clientName}
                  </p>
                  <p>
                    <strong>Email:</strong> {appt.clientEmail}
                  </p>
                  <p className="mb-4">
                    <strong>Inquiry:</strong> {appt.inquiry}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="capitalize">{appt.status}</span>
                  </p>
                </div>

                {appt.status === "pending" && (
                  <div className="flex space-x-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => updateStatus(appt.id, "accepted")}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateStatus(appt.id, "rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
