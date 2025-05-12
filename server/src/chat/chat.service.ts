import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
  ) {}

  async getMessages(appointmentId: number) {
    return this.messageRepo.find({
      where: { appointment: { id: appointmentId } },
      order: { sentAt: 'ASC' },
    });
  }

  async createMessage(data: {
    appointmentId: number;
    sender: 'user' | 'lawyer';
    message: string;
  }) {
    const msg = this.messageRepo.create({
      appointment: { id: data.appointmentId },
      sender: data.sender,
      message: data.message,
    });
    return this.messageRepo.save(msg);
  }
}
