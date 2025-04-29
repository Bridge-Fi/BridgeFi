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
import { UserAPI } from "../api/UserAPI";
import { Loader2 } from "lucide-react";

interface Lawyer {
  fullName: string;
  visaSpecialties: string[];
  education: string;
  legalExperience: string;
  yearsOfExperience?: number;
}

function LawyerCard({
  name,
  title,
  image,
  bio,
}: {
  name: string;
  title: string;
  image: StaticImageData;
  bio: string;
}) {
  return (
    <Card className="shadow-sm w-full max-w-xs">
      <CardHeader className="flex justify-center">
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className="rounded-full mx-auto"
        />
      </CardHeader>
      <div className="flex items-center p-5">
        <CardContent className="text-center px-4 pb-4">
          <CardTitle className="font-bold">{name}</CardTitle>
          <CardDescription className="text-sm text-gray-500 pt-2">
            {title}
          </CardDescription>
          <p className="mt-2 text-gray-600 text-xs">{bio}</p>
          <div className="mt-4 flex space-x-3 justify-center text-gray-600">
            <a href="#" className="hover:text-blue-600">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-blue-600">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-600">
              <FaFacebook />
            </a>
          </div>
        </CardContent>
      </div>
    </Card>
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

        const lawyersData = await UserAPI.getLawyers();
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

  const transformedLawyers = lawyers.map((lawyer) => ({
    name: lawyer.fullName,
    title: `Visa Specialist (${lawyer.visaSpecialties.join(", ")})`,
    bio: `${lawyer.education}. ${lawyer.legalExperience}${
      lawyer.yearsOfExperience
        ? ` ${lawyer.yearsOfExperience} years of experience`
        : ""
    }`,
    image: avatar,
  }));

  return (
    <main className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Our Lawyers</h1>
        <p className="text-center text-gray-600 mb-10">
          Meet the legal experts ready to assist you in making your pathway to
          the USA easier.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {transformedLawyers.map((lawyer, index) => (
            <LawyerCard key={index} {...lawyer} />
          ))}
        </div>
      </div>
    </main>
  );
}
