import Link from 'next/link'

export default function DashboardHeader() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">BridgeFi</Link>
      <nav>
        <Link href="/(dashboard)" className="mr-4">Dashboard</Link>
        <Link href="/(auth)/login" className="mr-4">Logout</Link>
      </nav>
    </header>
  )
}
