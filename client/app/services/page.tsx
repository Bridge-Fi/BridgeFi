import { ServicesHero } from "@/components/servicesComponents/services-hero";
import { ServicesOverview } from "@/components/servicesComponents/services-overview";
import { ServicesPricing } from "@/components/servicesComponents/services-pricing";
import { ServicesProcess } from "@/components/servicesComponents/services-process";
import { ServicesCTA } from "@/components/servicesComponents/setvices-cta";

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <ServicesHero />
      <ServicesOverview />
      <ServicesProcess />
      <ServicesPricing />
      <ServicesCTA />
    </div>
  );
}
