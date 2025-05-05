"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { UserAPI } from "../api/UserAPI";
import { User } from "../types/user";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

export default function ProfilePage() {
  const router = useRouter();
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
        console.log(user);
        if (user instanceof Error) throw new Error("Not authenticated");
        setCurrentUser({ ...user, id: user.sub });
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

      resetForm({
        values: {
          email: values.email,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        },
      });
    } catch (error: any) {
      setError(error.message || "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

        {error && (
          <div className="text-red-500 mb-4 p-3 bg-red-50 rounded">{error}</div>
        )}
        {success && (
          <div className="text-green-500 mb-4 p-3 bg-green-50 rounded">
            {success}
          </div>
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
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
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
                  Current Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Field
                    name="currentPassword"
                    type={showPassword.current ? "text" : "password"}
                    className="w-full p-2 border rounded pr-10"
                    placeholder="Required for any changes"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    aria-label={
                      showPassword.current ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    New Password (Optional)
                  </label>
                  <div className="relative">
                    <Field
                      name="newPassword"
                      type={showPassword.new ? "text" : "password"}
                      className="w-full p-2 border rounded pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("new")}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                      aria-label={
                        showPassword.new ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Field
                      name="confirmPassword"
                      type={showPassword.confirm ? "text" : "password"}
                      className="w-full p-2 border rounded pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirm")}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                      aria-label={
                        showPassword.confirm ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
