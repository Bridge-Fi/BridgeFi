"use client";

import { IoArrowBack } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UsesAPI } from "@/app/api/UserAPI";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    await UsesAPI.register({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
  };

  return (
    <main className="flex min-h-screen w-full">
      <div
        className="relative hidden w-1/2 flex-col items-center justify-center md:flex"
        style={{
          backgroundImage: "url(/images/office-background.jpg)",
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
              Sign up for an account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join us! Please enter your details.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <div className="mt-1">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400
                             focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400
                             focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400
                             focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400
                             focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              variant="default"
              className="w-full bg-blue-600 py-2 px-4 text-sm font-medium text-white
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600
                         focus:ring-offset-2"
            >
              Sign up
            </Button>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 border-gray-300
                           bg-white text-gray-700 hover:bg-gray-50"
              >
                <FaGoogle />
                Google
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 border-gray-300
                           bg-white text-gray-700 hover:bg-gray-50"
              >
                <FaApple />
                Apple
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 border-gray-300
                           bg-white text-gray-700 hover:bg-gray-50"
              >
                <FaFacebook />
                Facebook
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
