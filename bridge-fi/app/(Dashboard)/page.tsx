import { redirect } from 'next/navigation'

export default function DashboardRedirect() {
  // Redirect to the user dashboard by default. Adjust role-based logic as needed.
  redirect('/(dashboard)/user')
}
