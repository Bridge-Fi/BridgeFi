const stats = [
  { name: "Successful Cases", value: "2,500+" },
  { name: "Vetted Lawyers", value: "150+" },
  { name: "Partner Employers", value: "89" },
  { name: "Countries Served", value: "45" },
];

export function AboutStats() {
  return (
    <section className="py-24 bg-primary">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Our Impact
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Numbers that reflect the lives we've helped transform through legal
            immigration.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-blue-100">{stat.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
