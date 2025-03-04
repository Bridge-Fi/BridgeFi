'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add your login logic here.
    router.push('/(dashboard)')
  }

  return (
    <main className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium" htmlFor="email">Email</label>
          <input
            className="w-full border rounded p-2"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block font-medium" htmlFor="password">Password</label>
          <input
            className="w-full border rounded p-2"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </div>
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded" type="submit">
          Login
        </button>
      </form>
    </main>
  )
}
