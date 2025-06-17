import { CheckCircle, Users, Shield, Clock, Globe, Heart } from "lucide-react";

const features = [
  {
    name: "Vetted Professionals",
    description:
      "All lawyers and employers are thoroughly verified and reviewed.",
    icon: Shield,
  },
  {
    name: "Transparent Process",
    description: "Clear information about costs, timelines, and requirements.",
    icon: CheckCircle,
  },
  {
    name: "Community Support",
    description: "Connect with others on similar immigration journeys.",
    icon: Users,
  },
  {
    name: "Fast Connections",
    description: "Get matched with the right professionals quickly.",
    icon: Clock,
  },
  {
    name: "Global Reach",
    description: "Supporting immigrants from all countries and backgrounds.",
    icon: Globe,
  },
  {
    name: "Human-Centered",
    description: "Built with empathy and understanding for your journey.",
    icon: Heart,
  },
];

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose BridgeFi?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We understand that immigration is more than paperwork—it's about
            dreams, families, and building a better future.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-gray-900">
                    {feature.name}
                  </h3>
                </div>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
