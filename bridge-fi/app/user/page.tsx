export default function UserDashboard() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <p>Welcome, [User Name]! This is your dashboard overview.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold">Legal Checklist</h2>
            <p>Track your immigration process.</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold">Employer Recommendations</h2>
            <p>Find employers that match your profile.</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold">Financial Tools</h2>
            <p>Access budgeting and financial planning tools.</p>
          </div>
        </div>
      </div>
    )
  }
  