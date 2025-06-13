import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { ChatSession } from './entities/chat-session.entity/chat-session.entity';
import { Message } from './entities/message.entity/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatSession, Message])],
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}
