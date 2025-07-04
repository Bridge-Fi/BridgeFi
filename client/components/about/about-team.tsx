import Image from "next/image";
import Anxhela from "@/public/images/anxhela.jpg";
import Arbes from "@/public/images/arbes.jpg";

export function AboutTeam() {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A diverse group of professionals united by a common mission.
          </p>
        </div>

        <div className="flex justify-center gap-12">
          {/* Anxhela Teli */}
          <div className="text-center">
            <Image
              src={Anxhela}
              alt="Anxhela Teli"
              width={150}
              height={150}
              className="mx-auto rounded-full object-cover"
            />
            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Anxhela Teli
            </h3>
            <p className="text-primary font-medium">CEO &amp; Co-Founder</p>
            <p className="mt-4 text-gray-600">
              Leads our company vision and strategy, driving growth through
              innovation in immigration technology. She leverages her legal
              expertise and entrepreneurial spirit to create accessible
              solutions for users worldwide.
            </p>
          </div>

          {/* Arbes Avdiaj */}
          <div className="text-center">
            <Image
              src={Arbes}
              alt="Arbes Avdiaj"
              width={150}
              height={150}
              className="mx-auto rounded-full object-cover"
            />
            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Arbes Avdiaj
            </h3>
            <p className="text-primary font-medium">CTO &amp; Co-Founder</p>
            <p className="mt-4 text-gray-600">
              Oversees our technology roadmap and architecture, ensuring robust
              and scalable platform performance. With over 15 years of
              experience in software development, he champions best practices
              and drives technical innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
