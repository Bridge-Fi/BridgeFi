import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maria Rodriguez",
    role: "Software Engineer",
    content:
      "BridgeFi connected me with an amazing lawyer who helped me navigate the EB-2 NIW process. I couldn't have done it without their platform.",
    rating: 5,
    country: "Mexico",
  },
  {
    name: "Raj Patel",
    role: "Data Scientist",
    content:
      "Found my current employer through BridgeFi's job board. They were transparent about H1B sponsorship from day one.",
    rating: 5,
    country: "India",
  },
  {
    name: "Chen Wei",
    role: "Research Scientist",
    content:
      "The financial resources section helped me understand banking options as an international student. Incredibly helpful!",
    rating: 5,
    country: "China",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Success Stories
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Real people, real results. See how BridgeFi has helped others
            achieve their American dream.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <blockquote className="text-gray-900 mb-6">
                  "{testimonial.content}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role} • {testimonial.country}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
