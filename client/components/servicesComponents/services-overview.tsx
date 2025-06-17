import { Scale, Building2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    name: "Legal Services",
    description:
      "Connect with experienced immigration attorneys specializing in your case type.",
    icon: Scale,
    features: [
      "H1B, EB-2, EB-1 specialists",
      "Family-based immigration",
      "Asylum and refugee cases",
      "Deportation defense",
    ],
    cta: "Find Lawyers",
    href: "/lawyers",
  },
  {
    name: "Employment Hub",
    description:
      "Access job opportunities with employers who sponsor work visas.",
    icon: Building2,
    features: [
      "H1B sponsoring employers",
      "L1 transfer opportunities",
      "O-1 visa positions",
      "Startup visa programs",
    ],
    cta: "Browse Jobs",
    href: "/employers",
  },
  {
    name: "Financial Resources",
    description:
      "Navigate the financial aspects of immigration with expert guidance.",
    icon: DollarSign,
    features: [
      "Immigration-friendly banks",
      "Credit building guidance",
      "Cost calculators",
      "Funding resources",
    ],
    cta: "Explore Resources",
    href: "/financial",
  },
];

export function ServicesOverview() {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need for successful U.S. immigration, all in one
            place.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.name} className="bg-gray-50 rounded-2xl p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-6">
                <service.icon className="h-6 w-6 text-primary" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>

              <ul className="space-y-2 mb-8">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button asChild className="w-full">
                <Link href={service.href}>{service.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
