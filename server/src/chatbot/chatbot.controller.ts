import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ChatbotService } from './chatbot.service';
import { SendMessageDto } from './dto/send-message.dto/send-message.dto';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('session')
  @HttpCode(HttpStatus.CREATED)
  async createSession(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId: number | null = (req as any).user?.id ?? null;
    const session = await this.chatbotService.createSession(userId);
    await this.chatbotService.sendSystemPrompt(session.id, userId);
    res.cookie('SESSION_ID', session.id, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });
    return { sessionId: session.id };
  }

  @Post('send')
  @HttpCode(HttpStatus.OK)
  async sendMessage(@Body() dto: SendMessageDto, @Req() req: Request) {
    const userId: number | null = (req as any).user?.id ?? null;

    if (!dto.sessionId) {
      dto.sessionId = req.cookies['SESSION_ID'];
      if (!dto.sessionId) {
        throw new BadRequestException('sessionId is missing');
      }
    }

    const { bot } = await this.chatbotService.sendMessage(dto, userId);
    return { text: bot };
  }
}
