import Link from 'next/link'

export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <ul>
        <li className="mb-2">
          <Link href="/(dashboard)/user" className="text-gray-700 hover:underline">
            User Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/(dashboard)/lawyer" className="text-gray-700 hover:underline">
            Lawyer Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/(dashboard)/messages" className="text-gray-700 hover:underline">
            Messages
          </Link>
        </li>
      </ul>
    </aside>
  )
}
