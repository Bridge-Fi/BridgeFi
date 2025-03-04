import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">BridgeFi</h1>
          <nav>
            <Link href="/(landing)/about" className="mr-4">About</Link>
            <Link href="/(landing)/services" className="mr-4">Services</Link>
            <Link href="/(landing)/contact" className="mr-4">Contact</Link>
            <Link href="/(auth)/login">Login</Link>
          </nav>
        </div>
      </header>
      <section className="text-center py-20">
        <h2 className="text-4xl font-bold mb-4">Your Bridge to a New Future in the USA</h2>
        <p className="text-lg mb-8">
          Navigate your path to legal residency with expert legal advice, employer sponsorship, and financial guidance.
        </p>
        <Link href="/(auth)/signup" className="px-6 py-3 bg-blue-600 text-white rounded">
          Get Started
        </Link>
      </section>
    </main>
  )
}
