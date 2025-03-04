export default function ContactPage() {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <form className="space-y-6">
          <div>
            <label className="block font-medium" htmlFor="name">Name</label>
            <input className="w-full border rounded p-2" id="name" type="text" placeholder="Your Name" />
          </div>
          <div>
            <label className="block font-medium" htmlFor="email">Email</label>
            <input className="w-full border rounded p-2" id="email" type="email" placeholder="Your Email" />
          </div>
          <div>
            <label className="block font-medium" htmlFor="message">Message</label>
            <textarea className="w-full border rounded p-2" id="message" rows={5} placeholder="Your Message"></textarea>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded" type="submit">Send Message</button>
        </form>
      </main>
    )
  }
  