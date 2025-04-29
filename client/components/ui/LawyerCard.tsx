import { Lawyer } from "@/app/types/lawyer";

export default function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  return (
    <div className="w-full max-w-xs bg-white rounded-lg shadow-md p-4">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">{lawyer.fullName}</h3>
        <p className="text-sm text-gray-600 mb-2">{lawyer.legalExperience}</p>
        <p className="text-sm text-gray-500 mb-2">
          Education: {lawyer.education}
        </p>
        <div className="text-sm text-gray-500">
          Specialties: {lawyer.visaSpecialties?.join(", ")}
        </div>
        {lawyer.lawFirm && (
          <div className="text-sm text-gray-500 mt-2">
            Law Firm: {lawyer.lawFirm}
          </div>
        )}
        <div className="text-xs text-gray-400 mt-2">
          Verified: {lawyer.verified ? "Yes" : "No"}
        </div>
      </div>
    </div>
  );
}
