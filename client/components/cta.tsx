import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-green-600">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Join thousands of immigrants who have successfully navigated their
            path to the United States with BridgeFi.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base border-white hover:text-blue-600"
            >
              <Link href="/sign-up">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base border-white hover:text-blue-600"
            >
              <Link href="/login">Browse Lawyers</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
