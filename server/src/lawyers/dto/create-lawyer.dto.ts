export class CreateLawyerDto {
  fullName: string;

  email: string;

  phoneNumber: string;

  legalExperience: string;

  education: string;

  barNumber: string;

  visaSpecialties: string[];

  yearsOfExperience?: number;

  lawFirm?: string;
}
