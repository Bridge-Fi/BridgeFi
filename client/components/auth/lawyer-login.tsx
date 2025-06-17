"use client";

import { IoArrowBack } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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

  // app/lawyer-login/page.tsx
  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setError("");
      // 1) POST /lawyers/login
      await LawyerApi.login(values.email, values.password);

      // 2) GET /lawyers/me
      const lawyer = await LawyerApi.getLoggedUser();
      if (lawyer instanceof Error || lawyer.role !== "lawyer") {
        throw new Error("Not a lawyer");
      }

      // 3) Persist & redirect
      localStorage.setItem("currentLawyer", JSON.stringify(lawyer));
      router.push("/lawyer-dashboard");
    } catch (e: any) {
      setError(e.response?.data?.message || e.message || "Invalid credentials");
    }
  };

  return (
    <main className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 bg-[url('/images/lawyer.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-blue-600/60" />
        <div className="relative z-10 m-auto text-white text-center px-8">
          <h1 className="text-3xl font-bold mb-4">Lawyer Portal</h1>
          <p className="text-lg">Manage your appointments seamlessly.</p>
        </div>
      </div>
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-800 mb-4 inline-block"
          >
            <IoArrowBack size={24} />
          </Link>

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Lawyer Login
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Enter your credentials below.
          </p>

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
                    placeholder="you@example.com"
                    className="form-input mt-1 w-full"
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
                      className="form-input w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
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
                  <div className="text-red-500 bg-red-50 p-2 rounded text-center">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in…" : "Log in"}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Not a lawyer?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Log in as User
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}
