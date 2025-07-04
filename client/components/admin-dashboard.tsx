"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Loader2, LogOut, Plus, Edit, Trash2, Search } from "lucide-react";
import { UserAPI } from "@/app/api/UserAPI";
import { LawyerApi } from "@/app/api/LawyerApi";
import { useToast } from "./ui/useToast";

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
  location?: string;
  verified: boolean;
  createdAt: string;
}

const LawyerSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string().when("$isEditing", (isEditing, schema) =>
    isEditing ? schema.notRequired() : schema.required("Password is required")
  ),
  legalExperience: Yup.string().required("Legal experience is required"),
  education: Yup.string().required("Education is required"),
  barNumber: Yup.string().required("Bar number is required"),
  visaSpecialties: Yup.array()
    .min(1, "Select at least one visa specialty")
    .required("Visa specialties are required"),
  yearsOfExperience: Yup.number().nullable(),
  lawFirm: Yup.string().nullable(),
  location: Yup.string().required("Location is required"),
});

export function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("lawyers");
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingLawyers, setLoadingLawyers] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLawyer, setEditingLawyer] = useState<Lawyer | null>(null);

  // Auth + load
  useEffect(() => {
    (async () => {
      const user = await UserAPI.getLoggedUser();
      if (user instanceof Error || user.role !== "admin") {
        router.push("/");
        return;
      }
      setLoadingAuth(false);
      setLoadingLawyers(true);
      const data = await LawyerApi.getLawyers();
      if (!(data instanceof Error)) setLawyers(data);
      setLoadingLawyers(false);
    })();
  }, [router]);

  // Create/Edit Submit
  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      if (editingLawyer) {
        await LawyerApi.updateLawyer(editingLawyer.id, values);
        setLawyers((ls) =>
          ls.map((l) => (l.id === editingLawyer.id ? { ...l, ...values } : l))
        );
        toast({ title: "Lawyer updated" });
      } else {
        const newL = await LawyerApi.registerLawyer(values);
        setLawyers((ls) => [...ls, newL]);
        toast({ title: "Lawyer created" });
      }
      resetForm();
      setEditingLawyer(null);
      setIsDialogOpen(false);
    } catch (e: any) {
      toast({
        title: "Operation failed",
        description: e.message,
        type: "error",
      });
    }
  };

  // Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this lawyer?")) return;
    await LawyerApi.deleteLawyer(id);
    setLawyers((ls) => ls.filter((l) => l.id !== id));
    toast({ title: "Lawyer deleted" });
  };

  // Logout
  const handleLogout = async () => {
    await UserAPI.logout();
    router.push("/");
  };

  if (loadingAuth) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2" /> Logout
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="lawyers">Lawyers</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="lawyers">
          <div className="flex justify-between mb-4">
            <Button
              variant="default"
              onClick={() => {
                setEditingLawyer(null);
                setIsDialogOpen(true);
              }}
            >
              <Plus className="mr-2" /> Add Lawyer
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Firm</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loadingLawyers ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      <Loader2 className="animate-spin h-6 w-6" />
                    </TableCell>
                  </TableRow>
                ) : (
                  lawyers.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell>{l.fullName}</TableCell>
                      <TableCell>{l.email}</TableCell>
                      <TableCell>{l.lawFirm}</TableCell>
                      <TableCell>{l.location}</TableCell>
                      <TableCell>
                        <Switch
                          checked={l.verified}
                          onCheckedChange={async () => {
                            await LawyerApi.updateLawyer(l.id, {
                              verified: !l.verified,
                            });
                            setLawyers((ls) =>
                              ls.map((x) =>
                                x.id === l.id
                                  ? { ...x, verified: !x.verified }
                                  : x
                              )
                            );
                            toast({ title: "Status updated" });
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingLawyer(l);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(l.id)}
                        >
                          <Trash2 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingLawyer ? "Edit Lawyer" : "New Lawyer"}
                </DialogTitle>
              </DialogHeader>

              <Formik
                initialValues={{
                  fullName: editingLawyer?.fullName || "",
                  email: editingLawyer?.email || "",
                  phoneNumber: editingLawyer?.phoneNumber || "",
                  password: "",
                  legalExperience: editingLawyer?.legalExperience || "",
                  education: editingLawyer?.education || "",
                  barNumber: editingLawyer?.barNumber || "",
                  visaSpecialties: editingLawyer?.visaSpecialties || [],
                  yearsOfExperience: editingLawyer?.yearsOfExperience || "",
                  lawFirm: editingLawyer?.lawFirm || "",
                  location: editingLawyer?.location || "",
                  verified: editingLawyer?.verified || false,
                }}
                validationSchema={LawyerSchema}
                validationContext={{ isEditing: Boolean(editingLawyer) }}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ isSubmitting }) => (
                  <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Field
                        as={Input}
                        name="fullName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Field
                        as={Input}
                        name="email"
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {!editingLawyer && (
                      <div>
                        <Label>Password</Label>
                        <Field
                          as={Input}
                          name="password"
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    )}

                    <div>
                      <Label>Phone Number</Label>
                      <Field
                        as={Input}
                        name="phoneNumber"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Label>Location (US State/City)</Label>
                      <Field
                        as={Input}
                        name="location"
                        placeholder="e.g., New York, NY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="location"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Label>Legal Experience</Label>
                      <Field name="legalExperience">
                        {({ field }: any) => (
                          <Textarea
                            {...field}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px] bg-white text-gray-900 resize-none"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="legalExperience"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Label>Education</Label>
                      <Field name="education">
                        {({ field }: any) => (
                          <Textarea
                            {...field}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px] bg-white text-gray-900 resize-none"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="education"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Label>Bar Number</Label>
                      <Field
                        as={Input}
                        name="barNumber"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="barNumber"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Label>Visa Specialties</Label>
                      <div className="grid grid-cols-2 gap-2 p-2 border border-gray-300 rounded-md bg-white">
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
                        ].map((type) => (
                          <label
                            key={type}
                            className="flex items-center space-x-2"
                          >
                            <Field
                              type="checkbox"
                              name="visaSpecialties"
                              value={type}
                              className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <span className="text-sm text-gray-900">
                              {type}
                            </span>
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
                      <Label>Years of Experience</Label>
                      <Field
                        as={Input}
                        name="yearsOfExperience"
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <Label>Law Firm</Label>
                      <Field
                        as={Input}
                        name="lawFirm"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Field
                        name="verified"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <Label className="text-gray-900">Verified</Label>
                    </div>

                    <div className="md:col-span-2 flex justify-end space-x-2">
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                          disabled={isSubmitting}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Saving..." : "Save"}
                        </Button>
                      </DialogFooter>
                    </div>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Jobs</CardTitle>
            </CardHeader>
            <CardContent>Coming soon...</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
