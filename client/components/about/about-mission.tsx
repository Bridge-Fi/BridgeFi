import { Target, Heart, Users } from "lucide-react";

export function AboutMission() {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Mission
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            To transform the immigration experience by connecting people with
            the right resources, making the complex simple, and turning
            uncertainty into confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Clear Direction
            </h3>
            <p className="mt-4 text-gray-600">
              We provide clear, actionable guidance through every step of your
              immigration journey, eliminating confusion and uncertainty.
            </p>
          </div>

          <div className="text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
              <Heart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Human-Centered
            </h3>
            <p className="mt-4 text-gray-600">
              Every feature we build is designed with empathy, understanding
              that behind every case is a person with dreams and aspirations.
            </p>
          </div>

          <div className="text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mx-auto">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">
              Community First
            </h3>
            <p className="mt-4 text-gray-600">
              We're building more than a platform—we're creating a supportive
              community where immigrants can find help, hope, and belonging.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
