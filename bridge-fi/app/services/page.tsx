import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Layout from "@/app/layout"
import { Button } from "@/components/ui/button"
import { IconType } from "react-icons"
import {
  FaBalanceScale,
  FaBuilding,
  FaChartLine,
  FaComments,
  FaFileAlt,
  FaLanguage,
  FaPhone,
} from "react-icons/fa"
import { FaCheck } from "react-icons/fa"

const ServicesPage = () => {
  return (
      <main className="bg-white">
        <section className="w-full bg-gray-50 py-12 px-4 text-left">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Our Immigration Services</h1>
            <p className="text-gray-700">
              Comprehensive immigration solutions tailored to your needs. 
              Choose from our range of professional services.
            </p>
          </div>
          <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard
              icon={FaBalanceScale}
              title="Legal Assistance"
              description="Expert legal guidance for visa applications, permanent residency, and citizenship processes."
              features={[
                "Visa Application Support",
                "Document Review",
                "Legal Consultation",
              ]}
            />
            <ServiceCard
              icon={FaBuilding}
              title="Employer Sponsorship"
              description="Complete support for businesses sponsoring foreign workers—documentation, compliance, and communication."
              features={[
                "Work Visa Proccessing",
                "Employer Matching",
                "Skills Assessment",
              ]}
            />
            <ServiceCard
              icon={FaChartLine}
              title="Financial Guidance"
              description="Professional financial planning for immigrants—taxes, banking, and investment opportunities."
              features={[
                "Banking Assistance",
                "Credit Building",
                "Investment Planing",
              ]}
            />
          </div>
        </section>

        <section className="w-full bg-white py-12 px-4 text-left">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Additional Services</h2>
            <p className="text-gray-700 text-center">
              We also provide these specialized offerings to better serve you.
            </p>
          </div>
          <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard
              icon={FaComments}
              title="Free Consultation"
              description="Schedule a 30-minute session with our experts to discuss your case."
            />
            <ServiceCard
              icon={FaFileAlt}
              title="Document Review"
              description="Professional review and verification of all your immigration documents."
            />
            <ServiceCard
              icon={FaLanguage}
              title="Translation Services"
              description="Certified translation of documents in multiple languages."
            />
            <ServiceCard
              icon={FaPhone}
              title="24/7 Support"
              description="Round-the-clock assistance for urgent immigration matters."
            />
          </div>
        </section>

        <section className="w-full bg-blue-50 py-12 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Start Your Immigration Journey?
            </h2>
            <p className="text-gray-700 mb-6">
              Our team of experts is here to help you achieve your immigration goals. 
              Contact us today for a personalized consultation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="default">Schedule Consultation</Button>
              <Button variant="outline">Contact Us</Button>
            </div>
          </div>
        </section>
      </main>
  )
}
export default ServicesPage

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  features,
}: {
  icon: IconType
  title: string
  description: string
  features?: string[] // optional
}) => {
  return (
    <Card className="p-4 h-full flex flex-col justify-between">
      <CardHeader className="mb-4 space-y-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-blue-100 text-blue-600">
          <Icon size={24} />
        </div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>

        {features && features.length > 0 && (
          <div className="mt-3 space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-2 text-gray-700">
                <FaCheck className="mt-1 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}
      </CardHeader>

      <div className="mt-auto">
        <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:underline pl-6">
          Learn More <span className="ml-1">→</span>
        </a>
      </div>
    </Card>
  )
}
