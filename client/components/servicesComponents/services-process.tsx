const steps = [
  {
    step: "01",
    title: "Assessment",
    description:
      "Tell us about your immigration goals and current situation through our secure platform.",
  },
  {
    step: "02",
    title: "Matching",
    description:
      "Our algorithm connects you with the most suitable lawyers, employers, and resources.",
  },
  {
    step: "03",
    title: "Success",
    description:
      "Work with your matched professionals to achieve your immigration objectives.",
  },
];

export function ServicesProcess() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our streamlined process gets you connected with the right help
            quickly and efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
