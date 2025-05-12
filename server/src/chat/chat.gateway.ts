import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('joinAppointment')
  async handleJoin(client: any, appointmentId: number) {
    client.join(appointmentId.toString());
    const messages = await this.chatService.getMessages(appointmentId);
    client.emit('messageHistory', messages);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    client: any,
    payload: {
      appointmentId: number;
      sender: 'user' | 'lawyer';
      message: string;
    },
  ) {
    const msg = await this.chatService.createMessage(payload);
    this.server.to(payload.appointmentId.toString()).emit('newMessage', msg);
  }
}
