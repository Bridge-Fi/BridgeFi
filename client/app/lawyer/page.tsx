// app/lawyer.tsx
"use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import avatar from "@/public/images/avatar.jpeg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { LawyerApi } from "../api/LawyerApi";
import { UserAPI } from "../api/UserAPI";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";

interface Lawyer {
  id: number;
  fullName: string;
  visaSpecialties: string[];
  education: string;
  legalExperience: string;
  yearsOfExperience?: number;
}

// Validation for separate date/time and inquiry
const AppointmentSchema = Yup.object().shape({
  date: Yup.string().required("Please choose a date"),
  time: Yup.string().required("Please choose a time"),
  inquiry: Yup.string().required("Inquiry is required"),
});

function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (values: {
    date: string;
    time: string;
    inquiry: string;
  }) => {
    setSubmissionStatus("loading");
    try {
      const [year, month, day] = values.date.split("-").map(Number);
      let [hours, minutes] = values.time.split(":").map(Number);

      const d = new Date(year, month - 1, day, hours, minutes, 0);
      const appointmentDate = d.toISOString();

      await LawyerApi.bookAppointment({
        lawyerId: lawyer.id,
        appointmentDate,
        inquiry: values.inquiry,
      });

      setSubmissionStatus("success");
      // Remove the setTimeout that closes the dialog
    } catch {
      setSubmissionStatus("error");
    }
  };

  // Add this useEffect to reset state when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      setSubmissionStatus("idle");
    }
  }, [isDialogOpen]);

  return (
    <>
      <Card className="shadow-sm w-full max-w-xs">
        <CardHeader className="flex justify-center">
          <Image
            src={avatar}
            alt={lawyer.fullName}
            width={100}
            height={100}
            className="rounded-full mx-auto"
          />
        </CardHeader>
        <div className="flex items-center p-5">
          <CardContent className="text-center px-4 pb-4">
            <CardTitle className="font-bold">{lawyer.fullName}</CardTitle>
            <CardDescription className="text-sm text-gray-500 pt-2">
              {lawyer.education}. {lawyer.legalExperience}
              {lawyer.yearsOfExperience
                ? ` ${lawyer.yearsOfExperience} years of experience`
                : ""}
            </CardDescription>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Book Appointment
            </Button>
          </CardContent>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment with {lawyer.fullName}</DialogTitle>
            <DialogDescription>
              Fill out the form below to send your inquiry
            </DialogDescription>
          </DialogHeader>

          {submissionStatus === "success" ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-100 text-green-800 rounded-md">
                Appointment booked successfully!
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <Formik
              initialValues={{ date: "", time: "", inquiry: "" }}
              validationSchema={AppointmentSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date
                    </label>
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
                    <label className="block text-sm font-medium mb-1">
                      Time
                    </label>
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
                      Your Inquiry
                    </label>
                    <Field
                      name="inquiry"
                      as="textarea"
                      className="w-full p-2 border rounded h-32"
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
                      type="button"
                      variant="secondary"
                      onClick={() => setIsDialogOpen(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
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
    </>
  );
}

export default function LawyersShowcase() {
  const router = useRouter();
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuthAndFetchLawyers = async () => {
      try {
        const user = await UserAPI.getLoggedUser();
        if (user instanceof Error || user.role !== "user") {
          router.push("/");
          return;
        }
        const lawyersData = await LawyerApi.getLawyers();
        if (lawyersData instanceof Error) setError("Failed to fetch lawyers.");
        else setLawyers(lawyersData);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuthAndFetchLawyers();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <main className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Our Lawyers</h1>
        <p className="text-center text-gray-600 mb-10">
          Meet the legal experts ready to assist you in making your pathway to
          the USA easier.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {lawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>
      </div>
    </main>
  );
}
