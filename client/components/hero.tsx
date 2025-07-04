import { Button } from "@/components/ui/button";
import { ArrowRight, Scale, Building2, DollarSign } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-200 via-white to-green-200 py-20 sm:py-32">
      <div className="container mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your Bridge to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Legal U.S. Immigration
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Navigate your immigration journey with confidence. Connect with
            vetted lawyers, find employers offering sponsorship, and access
            financial resources—all in one platform.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Scale className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Legal Guidance
              </h3>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Connect with experienced immigration attorneys
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Employment
              </h3>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Find employers offering visa sponsorship
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Financial Support
              </h3>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Access resources and financial guidance
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base">
              <Link href="/login">
                Explore Legal Help
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link href="/login">Find Employers</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link href="/login">Get Financial Guidance</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
