export class CreateAppointmentDto {
  lawyerId: number;
  clientName: string;
  clientEmail: string;
  inquiry: string;
  date: Date;
  appointmentDate: string;
  userId: number;
  notificationEmail: string;
}
