export interface Lawyer {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  legalExperience: string;
  education: string;
  barNumber: string;
  visaSpecialties: string[];
  yearsOfExperience?: number;
  lawFirm?: string;
  verified: boolean;
  createdAt: string;
  notificationEmail: string;
}

export interface UpdateLawyer {
  id?: number;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  legalExperience?: string;
  education?: string;
  barNumber?: string;
  visaSpecialties?: string[];
  yearsOfExperience?: number;
  lawFirm?: string;
  verified?: boolean;
}
