// src/chatbot/chatbot.controller.ts
import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { SendMessageDto } from './dto/send-message.dto/send-message.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  // 1) Create a new (possibly anonymous) session
  @Post('session')
  @HttpCode(HttpStatus.CREATED)
  async createSession(@Req() req) {
    // if user is not logged in, req.user will be undefined
    const userId: number | null = req.user?.id ?? null;
    const session = await this.chatbotService.createSession(userId);
    // immediately seed the system prompt
    await this.chatbotService.sendSystemPrompt(session.id, userId);
    return { sessionId: session.id };
  }

  // 2) Send a user message (requires a valid JWT)
  @Post('send')
  async sendMessage(@Body() dto: SendMessageDto, @Req() req) {
    // req.user may be undefined if user is anonymous
    const userId: number | null = req.user?.id ?? null;
    return this.chatbotService.sendMessage(dto, userId);
  }
}
