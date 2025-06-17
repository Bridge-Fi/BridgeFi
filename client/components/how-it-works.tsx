import { ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Tell Us Your Story",
    description:
      "Share your immigration goals and current situation with our secure platform.",
  },
  {
    step: "02",
    title: "Get Matched",
    description:
      "Our algorithm connects you with the right lawyers, employers, and resources.",
  },
  {
    step: "03",
    title: "Start Your Journey",
    description:
      "Begin working with your matched professionals to achieve your immigration goals.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Getting started is simple. We've streamlined the process to get you
            connected with the right help as quickly as possible.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{step.description}</p>
                </div>

                {index < steps.length - 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
