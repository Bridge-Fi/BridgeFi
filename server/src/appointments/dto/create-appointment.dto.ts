export class CreateAppointmentDto {
  lawyerId: number;
  clientName: string;
  clientEmail: string;
  inquiry: string;
  date: Date;
  userId: number;
  notificationEmail: string;
}
