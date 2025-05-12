"use client";
import Image, { StaticImageData } from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import avatar from "@/public/images/avatar.jpeg";
import { FaLinkedinIn, FaTwitter, FaFacebook } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { LawyerApi } from "../api/LawyerApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Lawyer {
  id: number;
  fullName: string;
  email: string;
  visaSpecialties: string[];
  education: string;
  legalExperience: string;
  yearsOfExperience?: number;
}

const AppointmentSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  inquiry: Yup.string().required("Inquiry is required"),
});

function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (values: any) => {
    setSubmissionStatus("loading");
    try {
      await LawyerApi.bookAppointment({
        lawyerId: lawyer.id,
        clientName: values.fullName,
        clientEmail: values.email,
        inquiry: values.inquiry,
      });
      setSubmissionStatus("success");
      setTimeout(() => setIsDialogOpen(false), 2000);
    } catch (error) {
      setSubmissionStatus("error");
    }
  };

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
              {`Visa Specialist (${lawyer.visaSpecialties.join(", ")})`}
            </CardDescription>
            <p className="mt-2 text-gray-600 text-xs">
              {`${lawyer.education}. ${lawyer.legalExperience}${
                lawyer.yearsOfExperience
                  ? ` ${lawyer.yearsOfExperience} years of experience`
                  : ""
              }`}
            </p>
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

          <Formik
            initialValues={{ fullName: "", email: "", inquiry: "" }}
            validationSchema={AppointmentSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <Field
                    name="fullName"
                    className="w-full p-2 border rounded"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full p-2 border rounded"
                  />
                  <ErrorMessage
                    name="email"
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
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submissionStatus === "loading"}
                  >
                    {submissionStatus === "loading" ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : submissionStatus === "success" ? (
                      "Success!"
                    ) : submissionStatus === "error" ? (
                      "Error - Try Again"
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
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
        const user = await LawyerApi.getLoggedUser();
        if (user instanceof Error || user.role !== "user") {
          router.push("/");
          return;
        }

        const lawyersData = await LawyerApi.getLawyers();
        if (lawyersData instanceof Error) {
          setError("Failed to fetch lawyers.");
        } else {
          setLawyers(lawyersData);
        }
      } catch (error) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchLawyers();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
