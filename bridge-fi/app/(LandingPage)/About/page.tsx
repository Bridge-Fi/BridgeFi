import Image, { StaticImageData } from "next/image"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa"
import { BsShieldFillCheck } from "react-icons/bs"
import { FiZap, FiGlobe } from "react-icons/fi"
import { IconType } from "react-icons"
import avatar from "@/public/images/avatar.jpeg"
import Bridge from "@/public/images/hero-bridge.jpg"
import Layout from "@/app/layout"



export default function AboutPage() {
  return (
    <Layout>
    <main className="bg-white">
      <section className="text-center bg-blue-50 py-10 px-4">
        <h1 className="text-4xl font-bold mb-3">About BridgeFi</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Dedicated to bringing clarity, innovation, and accessibility to global immigration.
          We're building bridges for tomorrow's workforce by blending technology and expertise.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-8">
          <StatBox label="Active Users" value="150K+" />
          <StatBox label="Countries" value="50+" />
          <StatBox label="Transactions" value="$2B+" />
        </div>
      </section>

      <section className="py-12 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2022, BridgeFi emerged from a simple yet powerful idea: offer
            a one-stop platform to guide individuals seeking a new life abroad. Our team
            of experts combines technology with personalized service, ensuring a seamless
            immigration experience.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Today, we're proud to be the partner of thousands of international families,
            helping them navigate legal requirements, find sponsorships, and secure
            financial stability.
          </p>
          <p className="mt-2 font-medium text-blue-600">— Trusted by leading partnerships</p>
        </div>
        <div className="flex justify-center">
          <Image
            src={Bridge}
            alt="About BridgeFi"
            width={900}
            height={300}
            className="rounded-md"
          />
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
        <h2 className="text-center text-2xl font-bold mb-6">Meet Our Team</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Dedicated professionals working together to revolutionize global immigration.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <TeamCard
            name="Arbes Avdiaj"
            title="Co-Founder"
            image={avatar}
            bio="Passionate about innovation and personal growth."
          />
          <TeamCard
            name="Anxhela Teli"
            title="Co-Founder"
            image={avatar}
            bio="Believer in data-driven solutions and agile methodologies."
          />
        </div>
      </section>

      <section className="py-12 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto">
        <h2 className="text-center text-2xl font-bold mb-6">What Sets Us Apart</h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
          Our commitment to integrity, innovation, and inclusivity helps us support you globally.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={BsShieldFillCheck}
            title="Security First"
            description="Robust data protection and legal compliance at every step."
          />
          <FeatureCard
            icon={FiZap}
            title="Lightning Fast"
            description="Seamless processes and efficient communication for swift outcomes."
          />
          <FeatureCard
            icon={FiGlobe}
            title="Global Reach"
            description="Connecting you to worldwide opportunities and networks."
          />
        </div>
      </section>
    </main>
    </Layout>
  )
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-bold text-blue-600">{value}</span>
      <span className="text-gray-700">{label}</span>
    </div>
  )
}

function TeamCard({
  name,
  title,
  image,
  bio,
}: {
  name: string
  title: string
  image: StaticImageData
  bio: string
}) {
  return (
    <Card className="p-4">
      <Image
        src={image}
        alt={name}
        width={100}
        height={100}
        className="rounded-full mx-auto object-cover"
      />
      <CardHeader className="text-center mt-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm text-center">{bio}</p>
        <div className="mt-4 flex space-x-3 justify-center text-gray-600">
          <a href="#" className="hover:text-blue-600">
            <FaLinkedinIn />
          </a>
          <a href="#" className="hover:text-blue-600">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-blue-600">
            <FaGithub />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: IconType
  title: string
  description: string
}) {
  return (
    <Card className="p-4">
      <CardHeader className="flex flex-col items-center text-center">
        <Icon size={32} className="text-blue-600 mb-2" />
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
