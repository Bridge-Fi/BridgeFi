// components/BookingDialog.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { LawyerApi } from "@/app/api/LawyerApi";

const AppointmentSchema = Yup.object().shape({
  date: Yup.string().required("Please choose a date"),
  time: Yup.string().required("Please choose a time"),
  inquiry: Yup.string().required("Inquiry is required"),
});

interface BookingDialogProps {
  lawyerId: number;
  children: React.ReactNode; // this will be your button
}

export function BookingDialog({ lawyerId, children }: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (open) setStatus("idle");
  }, [open]);

  const handleSubmit = async (values: {
    date: string;
    time: string;
    inquiry: string;
  }) => {
    setStatus("loading");
    try {
      const [year, month, day] = values.date.split("-").map(Number);
      const [hours, mins] = values.time.split(":").map(Number);
      const iso = new Date(year, month - 1, day, hours, mins).toISOString();
      await LawyerApi.bookAppointment({
        lawyerId,
        appointmentDate: iso,
        inquiry: values.inquiry,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            Select date, time and add your inquiry.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <>
            <div className="p-4 bg-green-100 text-green-800 rounded">
              Appointment booked!
            </div>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </>
        ) : (
          <Formik
            initialValues={{ date: "", time: "", inquiry: "" }}
            validationSchema={AppointmentSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <Field name="date">
                    {({ field }: FieldProps) => (
                      <input
                        type="date"
                        {...field}
                        className="w-full p-2 border rounded"
                        disabled={isSubmitting}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <Field name="time">
                    {({ field }: FieldProps) => (
                      <input
                        type="time"
                        {...field}
                        className="w-full p-2 border rounded"
                        disabled={isSubmitting}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="time"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Inquiry
                  </label>
                  <Field
                    as="textarea"
                    name="inquiry"
                    className="w-full p-2 border rounded h-24"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage
                    name="inquiry"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <DialogFooter>
                  <Button
                    variant="secondary"
                    onClick={() => setOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Submitting…
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        )}
      </DialogContent>
    </Dialog>
  );
}
