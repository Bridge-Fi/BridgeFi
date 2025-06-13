import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class SendMessageDto {
  @IsNumber()
  sessionId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
