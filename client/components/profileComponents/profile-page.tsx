"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Settings,
} from "lucide-react";
import { useToast } from "../ui/useToast";
import { UserAPI } from "@/app/api/UserAPI";

// Define User type inline to match your backend types
interface User {
  id: number;
  email: string;
  role: "user" | "lawyer" | "admin";
  sub?: number; // Add sub property if needed for compatibility
  firstName?: string;
  lastName?: string;
  [key: string]: any;
}

const ProfileSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  currentPassword: Yup.string().required(
    "Current password is required for any changes"
  ),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .nullable()
    .transform((value) => (value ? value : null)),
  confirmPassword: Yup.string()
    .nullable()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

export function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await UserAPI.getLoggedUser();
        if (user instanceof Error) throw new Error("Not authenticated");
        setCurrentUser({ ...user, id: user.sub || user.id });
      } catch (error) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleSubmit = async (
    values: any,
    { resetForm, setSubmitting }: any
  ) => {
    setError("");
    setSuccess("");

    try {
      if (!currentUser || typeof currentUser.id !== "number") {
        throw new Error("User ID is missing or invalid");
      }

      const updateData = {
        email: values.email,
        currentPassword: values.currentPassword,
        newPassword: values.newPassword || null,
      };

      const updatedUser = await UserAPI.updateUser(currentUser.id, updateData);

      if (updatedUser instanceof Error) {
        throw updatedUser;
      }

      setCurrentUser(updatedUser);
      setSuccess("Profile updated successfully!");

      toast({
        title: "Success",
        description: "Your profile has been updated successfully!",
      });

      resetForm({
        values: {
          email: values.email,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        },
      });
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update profile";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Profile Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your account settings and security preferences
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Account Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Account Type</p>
                    <Badge variant="secondary">
                      {currentUser?.role === "admin"
                        ? "Administrator"
                        : currentUser?.role === "lawyer"
                        ? "Lawyer"
                        : "Standard User"}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {currentUser?.email}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Security</p>
                    <p className="text-sm text-muted-foreground">
                      Password protected
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-sm">Security Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Use a strong, unique password
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Keep your email address up to date
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Never share your password
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Account Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Alert Messages */}
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="mb-6 border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      {success}
                    </AlertDescription>
                  </Alert>
                )}

                <Formik
                  initialValues={{
                    email: currentUser?.email || "",
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  }}
                  validationSchema={ProfileSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
                >
                  {({ isSubmitting, values, errors, touched }) => (
                    <Form className="space-y-6">
                      {/* Email Section */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium mb-4">
                            Email Address
                          </h3>
                          <div className="space-y-2">
                            <Label
                              htmlFor="email"
                              className="text-sm font-medium"
                            >
                              Email Address
                            </Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Field name="email">
                                {({ field }: any) => (
                                  <Input
                                    {...field}
                                    id="email"
                                    type="email"
                                    className={`pl-10 ${
                                      errors.email && touched.email
                                        ? "border-red-500 focus:border-red-500"
                                        : ""
                                    }`}
                                    placeholder="Enter your email address"
                                  />
                                )}
                              </Field>
                            </div>
                            <ErrorMessage
                              name="email"
                              component="p"
                              className="text-sm text-red-600"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Password Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Security</h3>

                        {/* Current Password */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="currentPassword"
                            className="text-sm font-medium"
                          >
                            Current Password{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Field name="currentPassword">
                              {({ field }: any) => (
                                <Input
                                  {...field}
                                  id="currentPassword"
                                  type={
                                    showPassword.current ? "text" : "password"
                                  }
                                  className={`pl-10 pr-10 ${
                                    errors.currentPassword &&
                                    touched.currentPassword
                                      ? "border-red-500 focus:border-red-500"
                                      : ""
                                  }`}
                                  placeholder="Enter your current password"
                                />
                              )}
                            </Field>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() =>
                                togglePasswordVisibility("current")
                              }
                              aria-label={
                                showPassword.current
                                  ? "Hide password"
                                  : "Show password"
                              }
                            >
                              {showPassword.current ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                          <ErrorMessage
                            name="currentPassword"
                            component="p"
                            className="text-sm text-red-600"
                          />
                          <p className="text-xs text-muted-foreground">
                            Required to verify your identity for any changes
                          </p>
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="newPassword"
                            className="text-sm font-medium"
                          >
                            New Password{" "}
                            <span className="text-muted-foreground">
                              (Optional)
                            </span>
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Field name="newPassword">
                              {({ field }: any) => (
                                <Input
                                  {...field}
                                  id="newPassword"
                                  type={showPassword.new ? "text" : "password"}
                                  className={`pl-10 pr-10 ${
                                    errors.newPassword && touched.newPassword
                                      ? "border-red-500 focus:border-red-500"
                                      : ""
                                  }`}
                                  placeholder="Enter a new password (optional)"
                                />
                              )}
                            </Field>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => togglePasswordVisibility("new")}
                              aria-label={
                                showPassword.new
                                  ? "Hide password"
                                  : "Show password"
                              }
                            >
                              {showPassword.new ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                          <ErrorMessage
                            name="newPassword"
                            component="p"
                            className="text-sm text-red-600"
                          />
                          {values.newPassword && (
                            <div className="text-xs text-muted-foreground">
                              Password strength:{" "}
                              {values.newPassword.length >= 8 ? "Good" : "Weak"}
                            </div>
                          )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="confirmPassword"
                            className="text-sm font-medium"
                          >
                            Confirm New Password
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Field name="confirmPassword">
                              {({ field }: any) => (
                                <Input
                                  {...field}
                                  id="confirmPassword"
                                  type={
                                    showPassword.confirm ? "text" : "password"
                                  }
                                  className={`pl-10 pr-10 ${
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                      ? "border-red-500 focus:border-red-500"
                                      : ""
                                  }`}
                                  placeholder="Confirm your new password"
                                  disabled={!values.newPassword}
                                />
                              )}
                            </Field>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() =>
                                togglePasswordVisibility("confirm")
                              }
                              aria-label={
                                showPassword.confirm
                                  ? "Hide password"
                                  : "Show password"
                              }
                              disabled={!values.newPassword}
                            >
                              {showPassword.confirm ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                          <ErrorMessage
                            name="confirmPassword"
                            component="p"
                            className="text-sm text-red-600"
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-6">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => router.back()}
                          className="sm:w-auto"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="sm:w-auto"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating Profile...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Update Profile
                            </>
                          )}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
