export default function FAQPage() {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <div>
          <details className="mb-4">
            <summary className="font-semibold">How does BridgeFi work?</summary>
            <p className="mt-2">BridgeFi connects you with legal experts, employers, and financial tools to help you navigate the immigration process.</p>
          </details>
          <details className="mb-4">
            <summary className="font-semibold">What services do you offer?</summary>
            <p className="mt-2">We offer legal assistance, employer sponsorship, and financial guidance tailored to your needs.</p>
          </details>
        </div>
      </main>
    )
  }
  