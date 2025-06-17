"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LawyerApi } from "@/app/api/LawyerApi";
import { LawyerHeader } from "@/components/lawyerComponents/lawyer-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  Calendar,
  XCircle,
  Eye,
  Loader2,
} from "lucide-react";

interface Appointment {
  id: number;
  user_id: number;
  lawyer_id: number;
  appointment_date: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  clientName: string;
  clientEmail: string;
  inquiry: string;
}

export default function LawyerDashboard() {
  const router = useRouter();
  const [lawyer, setLawyer] = useState<any>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<Appointment | null>(null);
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await LawyerApi.getLoggedUser();
        if (user instanceof Error || user.role !== "lawyer") {
          router.push("/lawyer-login");
          return;
        }
        setLawyer(user);

        const raw = await LawyerApi.getAppointmentsByLawyer(user.sub);
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

          normalized.sort((a, b) => b.id - a.id); // newest first
          setAppointments(normalized);
        }
      } catch (err) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const updateStatus = async (
    apptId: number,
    newStatus: "confirmed" | "cancelled"
  ) => {
    setUpdating(apptId);
    try {
      const res = await LawyerApi.updateAppointmentStatus(apptId, newStatus);
      if (res instanceof Error) {
        setError(`Failed to ${newStatus} appointment: ${res.message}`);
      } else {
        setAppointments((prev) =>
          prev.map((a) => (a.id === apptId ? { ...a, status: newStatus } : a))
        );
        // Clear any previous errors on successful update
        setError(null);
      }
    } catch (err) {
      setError(`Failed to ${newStatus} appointment.`);
    } finally {
      setUpdating(null);
      setOpen(false);
    }
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

  const stats = {
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
    total: appointments.length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error && !lawyer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <LawyerHeader lawyer={lawyer} pendingCount={stats.pending} />

      <div className="container py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Welcome, {lawyer.fullName}</h1>
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            {
              label: "Total",
              value: stats.total,
              icon: CalendarDays,
              color: "text-blue-600",
            },
            {
              label: "Pending",
              value: stats.pending,
              icon: Clock,
              color: "text-yellow-600",
            },
            {
              label: "Confirmed",
              value: stats.confirmed,
              icon: CheckCircle,
              color: "text-green-600",
            },
            {
              label: "Completed",
              value: stats.completed,
              icon: Calendar,
              color: "text-gray-600",
            },
            {
              label: "Cancelled",
              value: stats.cancelled,
              icon: XCircle,
              color: "text-red-600",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label}>
              <CardHeader className="flex justify-between pb-2">
                <CardTitle className="text-sm">{label}</CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid grid-cols-4">
            {["pending", "confirmed", "completed", "cancelled"].map((val) => (
              <TabsTrigger key={val} value={val} className="capitalize">
                {val}
                {(stats as any)[val] > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {(stats as any)[val]}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {["pending", "confirmed", "completed", "cancelled"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              {appointments.filter((a) => a.status === tab).length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No {tab} appointments.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Inquiry</TableHead>
                      {tab === "pending" && <TableHead>Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments
                      .filter((a) => a.status === tab)
                      .map((a) => (
                        <TableRow key={a.id}>
                          <TableCell>
                            <div className="font-medium">{a.clientName}</div>
                            <div className="text-sm text-gray-500">
                              {a.clientEmail}
                            </div>
                          </TableCell>
                          <TableCell>
                            {formatDate(a.appointment_date)}
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <div className="truncate" title={a.inquiry}>
                              {a.inquiry}
                            </div>
                          </TableCell>
                          {tab === "pending" && (
                            <TableCell>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setDetail(a);
                                  setOpen(true);
                                }}
                                disabled={updating === a.id}
                              >
                                {updating === a.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
            </DialogHeader>
            {detail && (
              <div className="space-y-4">
                <div>
                  <strong>Client:</strong> {detail.clientName}
                </div>
                <div>
                  <strong>Email:</strong> {detail.clientEmail}
                </div>
                <div>
                  <strong>Date & Time:</strong>{" "}
                  {formatDate(detail.appointment_date)}
                </div>
                <div>
                  <strong>Inquiry:</strong>
                  <div className="mt-1 p-2 bg-gray-50 rounded text-sm">
                    {detail.inquiry}
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    onClick={() => updateStatus(detail.id, "confirmed")}
                    disabled={updating === detail.id}
                  >
                    {updating === detail.id ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Accept
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => updateStatus(detail.id, "cancelled")}
                    disabled={updating === detail.id}
                  >
                    {updating === detail.id ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
