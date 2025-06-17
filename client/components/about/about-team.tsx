const team = [
  {
    name: "Anxhela Teli",
    role: "Founder & CEO",
    bio: "Former immigration attorney who experienced the system firsthand as an immigrant from Taiwan.",
    image: "/avatar.jpeg",
  },
  {
    name: "Arbes Avdiaj",
    role: "Head of Legal Partnerships",
    bio: "15+ years connecting immigrants with qualified legal representation across the United States.",
    image: "/avatar.jpeg",
  },
];

export function AboutTeam() {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A diverse group of immigrants, lawyers, and technologists united by
            a common mission.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="mx-auto h-48 w-48 rounded-full object-cover"
              />
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-primary font-medium">{member.role}</p>
              <p className="mt-4 text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
