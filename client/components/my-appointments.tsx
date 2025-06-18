"use client";

import { UserAPI } from "@/app/api/UserAPI";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  Calendar,
  CalendarDays,
  CheckCircle,
  Clock,
  Filter,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Search,
  User,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";

// Create a simple toast hook if it doesn't exist
const useToast = () => {
  return {
    toast: ({
      title,
      description,
    }: {
      title: string;
      description?: string;
    }) => {
      // Simple fallback toast implementation
      console.error(title, description);
      // You can replace this with your actual toast implementation
    },
  };
};

interface UserAppointment {
  id: number;
  appointmentDate: string;
  createdAt: string;
  updatedAt: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  inquiry: string;
  lawyer: {
    id: number;
    fullName: string;
    email: string;
    phone?: string;
    lawFirm: string;
    specialization: string;
  };
  fee: number;
}

export default function MyAppointmentsSection() {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<UserAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<UserAppointment | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | UserAppointment["status"]
  >("all");

  useEffect(() => {
    (async () => {
      try {
        const data = await UserAPI.getMyAppointments();
        if (data instanceof Error) throw data;
        data.sort(
          (a: UserAppointment, b: UserAppointment) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setAppointments(data);
      } catch {
        toast({ title: "Failed to load appointments" });
      } finally {
        setLoading(false);
      }
    })();
  }, [toast]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "Invalid date";
    return d.toLocaleString("en-US", {
      month: "short", // "Jun" instead of "June"
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatShortDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: UserAppointment["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-500 text-white">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "confirmed":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmed
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="default">
            <CalendarDays className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
    }
  };

  const getStatusIcon = (status: UserAppointment["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "completed":
        return <CalendarDays className="h-5 w-5 text-blue-500" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusDescription = (status: UserAppointment["status"]) => {
    switch (status) {
      case "pending":
        return "Your appointment request is being reviewed by the lawyer.";
      case "confirmed":
        return "Your appointment has been confirmed. Please be ready at the scheduled time.";
      case "completed":
        return "This appointment has been completed successfully.";
      case "cancelled":
        return "This appointment has been cancelled.";
    }
  };

  const filtered = appointments.filter((appt) => {
    const matchesSearch =
      (appt.lawyer.fullName?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (appt.lawyer.lawFirm?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (appt.inquiry?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || appt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value as "all" | UserAppointment["status"]);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                My Appointments
              </h1>
              <p className="text-muted-foreground">
                Track and manage your consultation appointments
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl">
            {[
              { icon: Calendar, value: stats.total, label: "Total" },
              { icon: Clock, value: stats.pending, label: "Pending" },
              { icon: CheckCircle, value: stats.confirmed, label: "Confirmed" },
              {
                icon: CalendarDays,
                value: stats.completed,
                label: "Completed",
              },
              { icon: XCircle, value: stats.cancelled, label: "Cancelled" },
            ].map(({ icon: Icon, value, label }, idx) => (
              <Card key={idx}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">{value}</p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={handleStatusFilterChange}
            >
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabs */}
          <div className="max-w-6xl">
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
              {(
                [
                  "all",
                  "pending",
                  "confirmed",
                  "completed",
                  "cancelled",
                ] as const
              ).map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <div className="space-y-4">
                    {filtered
                      .filter((a) => tab === "all" || a.status === tab)
                      .map((appt) => (
                        <AppointmentCard
                          key={appt.id}
                          appointment={appt}
                          onViewDetails={(a) => {
                            setSelected(a);
                            setDetailOpen(true);
                          }}
                          getStatusBadge={getStatusBadge}
                          formatDate={formatShortDate}
                        />
                      ))}
                    {filtered.filter((a) => tab === "all" || a.status === tab)
                      .length === 0 && (
                      <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Calendar className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No appointments found
                        </h3>
                        <p className="text-gray-500 mb-4">
                          {tab === "all"
                            ? "You haven't booked any appointments yet."
                            : `No ${tab} appointments found.`}
                        </p>
                        <Button
                          onClick={() => {
                            /* booking logic */
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Book Your First Appointment
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Detail Dialog */}
          <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Appointment Details</DialogTitle>
              </DialogHeader>
              {selected && (
                <AppointmentDetail
                  appointment={selected}
                  getStatusBadge={getStatusBadge}
                  getStatusIcon={getStatusIcon}
                  getStatusDescription={getStatusDescription}
                  formatDate={formatDate}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

// Helper components

function AppointmentCard({
  appointment,
  onViewDetails,
  getStatusBadge,
  formatDate,
}: {
  appointment: UserAppointment;
  onViewDetails: (a: UserAppointment) => void;
  getStatusBadge: (s: UserAppointment["status"]) => React.ReactNode;
  formatDate: (d: string) => string;
}) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          <div className="flex-1 space-y-4 min-w-0">
            {/* Lawyer Info */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-lg text-gray-900 truncate">
                  {appointment.lawyer.fullName}
                </h3>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <Building className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{appointment.lawyer.lawFirm}</span>
              <span className="text-gray-400"></span>
              <span className="truncate">
                {appointment.lawyer.specialization}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="truncate">
                  {formatDate(appointment.appointmentDate)}
                </span>
              </div>
            </div>

            {/* Inquiry Preview */}
            <div className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {appointment.inquiry}
              </p>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex flex-col items-end gap-3 flex-shrink-0 h-full">
            {getStatusBadge(appointment.status)}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(appointment)}
              className="whitespace-nowrap"
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AppointmentDetail({
  appointment,
  getStatusBadge,
  getStatusIcon,
  getStatusDescription,
  formatDate,
}: {
  appointment: UserAppointment;
  getStatusBadge: (s: UserAppointment["status"]) => React.ReactNode;
  getStatusIcon: (s: UserAppointment["status"]) => React.ReactNode;
  getStatusDescription: (s: UserAppointment["status"]) => string;
  formatDate: (d: string) => string;
}) {
  return (
    <div className="space-y-6">
      {/* Status Section */}
      <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
        {getStatusIcon(appointment.status)}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">Status:</span>
            {getStatusBadge(appointment.status)}
          </div>
          <p className="text-sm text-muted-foreground">
            {getStatusDescription(appointment.status)}
          </p>
        </div>
      </div>

      {/* Appointment Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Appointment Date</Label>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(appointment.appointmentDate)}</span>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Created</Label>
            <p className="text-sm text-muted-foreground mt-1">
              {formatDate(appointment.createdAt)}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Lawyer</Label>
            <div className="mt-2">
              <p className="font-semibold">{appointment.lawyer.fullName}</p>
              <p className="text-sm text-muted-foreground">
                {appointment.lawyer.specialization}
              </p>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Law Firm</Label>
            <div className="flex items-center gap-2 mt-1">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>{appointment.lawyer.lawFirm}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Contact</Label>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-3 w-3 text-muted-foreground" />
                <span>{appointment.lawyer.email}</span>
              </div>
              {appointment.lawyer.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span>{appointment.lawyer.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry */}
      <div>
        <Label className="text-sm font-medium">Inquiry Details</Label>
        <div className="mt-2 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm whitespace-pre-wrap">{appointment.inquiry}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t">
        {appointment.status === "confirmed" && (
          <Button size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Lawyer
          </Button>
        )}
        {appointment.status === "pending" && (
          <Button variant="outline" size="sm">
            <XCircle className="h-4 w-4 mr-2" />
            Cancel Request
          </Button>
        )}
      </div>
    </div>
  );
}
