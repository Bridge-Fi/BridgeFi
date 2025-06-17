import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

const benefits = [
  "Vetted immigration lawyers",
  "Transparent pricing",
  "Employer partnerships",
  "Financial guidance",
];

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 sm:py-32">
      <div className="container relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Comprehensive Immigration{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              From legal representation to employment opportunities and
              financial guidance, we provide everything you need for successful
              U.S. immigration.
            </p>

            <ul className="mt-8 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/auth/register">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-green-100 p-8">
              <div className="h-full w-full rounded-xl bg-white shadow-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    3-Step
                  </div>
                  <div className="text-gray-600">Simple Process</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
