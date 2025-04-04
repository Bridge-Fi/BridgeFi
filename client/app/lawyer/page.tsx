export default function LawyerDashboard() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Lawyer Dashboard</h1>
        <p>Welcome, [Lawyer Name]! Here are your latest updates.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold">Client Requests</h2>
            <p>View and manage your client requests.</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold">Upcoming Appointments</h2>
            <p>Check your schedule for upcoming consultations.</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold">Messages</h2>
            <p>See recent messages from clients.</p>
          </div>
        </div>
      </div>
    )
  }
  