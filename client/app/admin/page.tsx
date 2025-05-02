"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { UserAPI } from "../api/UserAPI";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LawyerApi } from "../api/LawyerApi";

interface Lawyer {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  legalExperience: string;
  education: string;
  barNumber: string;
  visaSpecialties: string[];
  yearsOfExperience?: number;
  lawFirm?: string;
  verified: boolean;
  createdAt: string;
}

const LawyerSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  legalExperience: Yup.string().required("Legal experience is required"),
  education: Yup.string().required("Education is required"),
  barNumber: Yup.string().required("Bar number is required"),
  visaSpecialties: Yup.array()
    .min(1, "Select at least one visa specialty")
    .required("Visa specialties are required"),
  yearsOfExperience: Yup.number().nullable(),
  lawFirm: Yup.string().nullable(),
});

export default function AdminDashboard() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showLawyersList, setShowLawyersList] = useState(false);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loadingLawyers, setLoadingLawyers] = useState(false);
  const [editingLawyer, setEditingLawyer] = useState<Lawyer | null>(null);

  useEffect(() => {
    const checkAuthAndLoadLawyers = async () => {
      try {
        const user = await UserAPI.getLoggedUser();

        if (user instanceof Error || user.role !== "admin") {
          router.push("/");
          return;
        }

        setLoadingLawyers(true);
        const lawyersData = await LawyerApi.getLawyers();
        if (!(lawyersData instanceof Error)) {
          setLawyers(lawyersData);
        }
      } catch (error) {
        router.push("/login");
      } finally {
        setLoadingAuth(false);
        setLoadingLawyers(false);
      }
    };

    checkAuthAndLoadLawyers();
  }, [router]);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      if (editingLawyer) {
        await LawyerApi.updateLawyer(editingLawyer.id, values);
        setLawyers(
          lawyers.map((l) =>
            l.id === editingLawyer.id ? { ...l, ...values } : l
          )
        );
      } else {
        const newLawyer = await LawyerApi.registerLawyer(values);
        setLawyers([...lawyers, newLawyer]);
      }
      resetForm();
      setEditingLawyer(null);
    } catch (error: any) {
      setError(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this lawyer?")) {
      try {
        await LawyerApi.deleteLawyer(id);
        setLawyers(lawyers.filter((l) => l.id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-r p-4">
        <nav className="space-y-4">
          <h2 className="font-bold text-lg mb-4">Admin Dashboard</h2>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setShowLawyersList(false);
              setEditingLawyer(null);
            }}
          >
            Create Lawyer
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setShowLawyersList(true)}
          >
            Lawyers Registered
          </Button>
          <Button
            variant="destructive"
            onClick={() => setIsDialogOpen(true)}
            className="w-full justify-start"
          >
            Logout
          </Button>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {showLawyersList ? (
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">Registered Lawyers</h1>
            {loadingLawyers ? (
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
              </div>
            ) : (
              <div className="space-y-4">
                {lawyers.length === 0 ? (
                  <p className="text-gray-500 text-center">
                    No lawyers registered yet
                  </p>
                ) : (
                  lawyers.map((lawyer) => (
                    <div key={lawyer.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">
                            {lawyer.fullName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {lawyer.email}
                          </p>
                          <p className="text-sm text-gray-500">
                            Phone: {lawyer.phoneNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            Specialties: {lawyer.visaSpecialties.join(", ")}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingLawyer(lawyer);
                              setShowLawyersList(false);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(lawyer.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6">
              {editingLawyer
                ? "Edit Lawyer Profile"
                : "Create New Lawyer Profile"}
            </h1>

            <Formik
              initialValues={{
                fullName: editingLawyer?.fullName || "",
                email: editingLawyer?.email || "",
                phoneNumber: editingLawyer?.phoneNumber || "",
                legalExperience: editingLawyer?.legalExperience || "",
                education: editingLawyer?.education || "",
                barNumber: editingLawyer?.barNumber || "",
                visaSpecialties: editingLawyer?.visaSpecialties || [],
                yearsOfExperience: editingLawyer?.yearsOfExperience || "",
                lawFirm: editingLawyer?.lawFirm || "",
              }}
              validationSchema={LawyerSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting, values }) => (
                <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
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
                        Phone Number
                      </label>
                      <Field
                        name="phoneNumber"
                        type="tel"
                        className="w-full p-2 border rounded"
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Legal Experience
                      </label>
                      <Field
                        name="legalExperience"
                        as="textarea"
                        className="w-full p-2 border rounded"
                      />
                      <ErrorMessage
                        name="legalExperience"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Education
                      </label>
                      <Field
                        name="education"
                        as="textarea"
                        className="w-full p-2 border rounded"
                      />
                      <ErrorMessage
                        name="education"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Bar Number
                      </label>
                      <Field
                        name="barNumber"
                        className="w-full p-2 border rounded"
                      />
                      <ErrorMessage
                        name="barNumber"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Visa Specialties
                      </label>
                      <div
                        role="group"
                        className="grid grid-cols-2 gap-2 p-2 border rounded"
                      >
                        {[
                          "F1",
                          "H1B",
                          "L1",
                          "EB5",
                          "OPT",
                          "J1",
                          "CR1",
                          "IR5",
                          "K1",
                        ].map((visaType) => (
                          <label
                            key={visaType}
                            className="flex items-center space-x-2"
                          >
                            <Field
                              type="checkbox"
                              name="visaSpecialties"
                              value={visaType}
                              className="h-4 w-4"
                            />
                            <span className="text-sm">{visaType}</span>
                          </label>
                        ))}
                      </div>
                      <ErrorMessage
                        name="visaSpecialties"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Years of Experience
                      </label>
                      <Field
                        name="yearsOfExperience"
                        type="number"
                        className="w-full p-2 border rounded"
                        value={values.yearsOfExperience || ""}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Law Firm
                      </label>
                      <Field
                        name="lawFirm"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {editingLawyer ? "Updating..." : "Creating..."}
                        </>
                      ) : editingLawyer ? (
                        "Update Lawyer"
                      ) : (
                        "Create Lawyer"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsDialogOpen(false)}
              disabled={isLoggingOut}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                setIsLoggingOut(true);
                try {
                  await UserAPI.logout();
                  router.push("/");
                } finally {
                  setIsLoggingOut(false);
                }
              }}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging Out..." : "Log Out"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
