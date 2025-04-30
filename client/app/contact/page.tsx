import { Button } from "@/components/ui/button";

const ContactPage = () => {
  return (
    <main className="bg-white">
      <section className="w-full py-12 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Get in Touch</h1>
        <p className="text-gray-700 max-w-xl mx-auto">
          Have questions or want to discuss a project? We'd love to hear from
          you. Send us a message and we'll respond as soon as possible.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <ContactInfoBox
              title="Our Location"
              content="123 Business Ave, Suite 100
New York, NY 10001"
            />
            <ContactInfoBox title="Phone" content="+1 (555) 123-4567" />
            <ContactInfoBox title="Email" content="contact@company.com" />
          </div>

          <div className="md:col-span-2 bg-white shadow p-6 rounded-lg">
            <form className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
              </div>

              <Button variant="default" className="mt-2">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
export default ContactPage;

const ContactInfoBox = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700 whitespace-pre-line">{content}</p>
    </div>
  );
};
