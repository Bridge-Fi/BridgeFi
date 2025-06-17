import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for getting started with your immigration research.",
    features: [
      "Access to lawyer directory",
      "Basic job search",
      "Financial resources library",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Premium",
    price: "$29/month",
    description: "Enhanced features for serious immigration planning.",
    features: [
      "Everything in Basic",
      "Priority lawyer matching",
      "Advanced job filters",
      "Cost calculator tools",
      "Email support",
    ],
    cta: "Start Premium",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For employers and organizations hiring international talent.",
    features: [
      "Bulk job postings",
      "Candidate screening",
      "Compliance tools",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function ServicesPricing() {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that best fits your immigration journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.popular
                  ? "bg-primary text-primary-foreground ring-2 ring-primary"
                  : "bg-gray-50"
              }`}
            >
              {plan.popular && (
                <div className="text-center mb-4">
                  <span className="bg-white text-primary px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    plan.popular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <div
                  className={`text-3xl font-bold mb-2 ${
                    plan.popular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.price}
                </div>
                <p className={plan.popular ? "text-blue-100" : "text-gray-600"}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle
                      className={`h-5 w-5 mr-3 ${
                        plan.popular ? "text-white" : "text-green-600"
                      }`}
                    />
                    <span
                      className={plan.popular ? "text-white" : "text-gray-700"}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-white text-primary hover:bg-gray-100"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
