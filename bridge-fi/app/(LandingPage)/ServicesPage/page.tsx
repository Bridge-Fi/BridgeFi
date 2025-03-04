export default function ServicesPage() {
    return (
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow rounded">
            <h2 className="font-bold mb-2">Legal Assistance</h2>
            <p>Connect with trusted attorneys for legal guidance on your immigration journey.</p>
          </div>
          <div className="bg-white p-6 shadow rounded">
            <h2 className="font-bold mb-2">Employer Sponsorship</h2>
            <p>Discover opportunities with employers looking to sponsor international talent.</p>
          </div>
          <div className="bg-white p-6 shadow rounded">
            <h2 className="font-bold mb-2">Financial Guidance</h2>
            <p>Access tools and advice to manage your finances during your transition.</p>
          </div>
        </div>
      </main>
    )
  }
  