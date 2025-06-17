import { Shield, Lightbulb, Scale, Globe } from "lucide-react";

const values = [
  {
    name: "Transparency",
    description:
      "We believe in clear, honest communication about costs, timelines, and processes.",
    icon: Shield,
  },
  {
    name: "Innovation",
    description:
      "We leverage technology to make immigration services more accessible and efficient.",
    icon: Lightbulb,
  },
  {
    name: "Integrity",
    description:
      "We maintain the highest ethical standards in all our partnerships and services.",
    icon: Scale,
  },
  {
    name: "Inclusivity",
    description:
      "We welcome and support immigrants from all backgrounds, countries, and circumstances.",
    icon: Globe,
  },
];

export function AboutValues() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Values
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            These core principles guide everything we do and every decision we
            make.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.name} className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {value.name}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
