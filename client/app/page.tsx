import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Bridge from "@/public/images/hero-bridge.jpg";
import { GoLaw, GoGraph } from "react-icons/go";
import { FaBuilding } from "react-icons/fa";
import Link from "next/link";

const page = () => {
  return (
    <main className="min-h-screen bg-gray-50 w-full">
      <section className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">
              Your Bridge to a New Future in the USA
            </h2>
            <p className="text-gray-600">
              Navigate your journey to success with expert guidance, legal
              support, and financial solutions tailored for international
              professionals.
            </p>
            <Link href="/sign-up" className="w-fit">
              <Button className="w-fit">Get Started</Button>
            </Link>
          </div>
          <div className="flex flex-row-reverse">
            <Image
              src={Bridge}
              alt="Bridge Illustration"
              width={700}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-center text-2xl font-bold text-gray-900 mb-6">
            Our Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard
              title="Legal Assistance"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              Icon={GoLaw}
            />
            <ServiceCard
              title="Employer Sponsorship"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              Icon={FaBuilding}
            />
            <ServiceCard
              title="Financial Guidance"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              Icon={GoGraph}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;

function ServiceCard({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-blue-100 text-blue-600">
          <Icon size={24} />
        </div>
        <div>
          <CardTitle className="pb-3">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
