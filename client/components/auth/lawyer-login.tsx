// app/lawyer-login/page.tsx
"use client";

import { IoArrowBack } from "react-icons/io5";
import {
  FaApple,
  FaFacebook,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LawyerApi } from "@/app/api/LawyerApi";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LawyerLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setError("");

      // 1) Lawyer login only
      await LawyerApi.login(values.email, values.password);

      // 2) Fetch the now-logged-in user via LawyerApi
      const user = await LawyerApi.getLoggedUser();
      if (user instanceof Error || user.role !== "lawyer") {
        throw new Error("Auth failed");
      }

      // 3) Redirect to lawyer dashboard
      router.push("/lawyer");
    } catch (e: any) {
      setError(e.response?.data?.message || e.message || "Invalid credentials");
    }
  };

  return (
    <main className="flex min-h-screen w-full">
      <div
        className="relative hidden w-1/2 flex-col items-center justify-center md:flex"
        style={{
          backgroundImage: "url(/images/lawyer.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-blue-600 bg-opacity-60" />
        <div className="relative z-10 text-center text-white max-w-md px-8">
          <h1 className="mb-4 text-3xl font-bold">Welcome to Our Platform</h1>
          <p className="text-lg">
            Streamline your workflow and boost productivity with our innovative
            solutions.
          </p>
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center bg-gray-50 p-4 md:w-1/2">
        <Link
          href="/"
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <IoArrowBack size={24} />
        </Link>

        <div className="w-full max-w-md rounded-lg bg-white px-6 py-8 shadow-lg sm:px-10">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Lawyer Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your lawyer credentials.
            </p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative mt-1">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="default"
                  className="w-full bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Log in"}
                </Button>
              </Form>
            )}
          </Formik>

          <p className="mt-8 text-center text-sm text-gray-600">
            Not a lawyer?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Log in as User
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
