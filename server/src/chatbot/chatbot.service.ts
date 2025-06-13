import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

import { ChatSession } from './entities/chat-session.entity/chat-session.entity';
import { Message } from './entities/message.entity/message.entity';
import { SendMessageDto } from './dto/send-message.dto/send-message.dto';

@Injectable()
export class ChatbotService {
  private readonly systemPrompt = `
You are BridgeFi’s virtual immigration assistant. Your user is an international
visa applicant who needs up-to-date, accurate guidance on U.S. immigration processes,
embassy fees, required documents, timelines, and country-specific visa rules.
Be concise, refer only to official sources, and always clarify if you need more details
(e.g., country of origin, visa category). Your tone is friendly, professional, and supportive.
`.trim();

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ChatSession)
    private readonly sessionRepo: Repository<ChatSession>,
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async createSession(userId: number) {
    const session = this.sessionRepo.create({ user: { id: userId } });
    return await this.sessionRepo.save(session);
  }

  async sendSystemPrompt(sessionId: number, userId: number) {
    const session = await this.sessionRepo.findOneBy({ id: sessionId });
    await this.messageRepo.save(
      this.messageRepo.create({
        session,
        sender: 'system',
        content: this.systemPrompt,
      }),
    );
  }

  async sendMessage(dto: SendMessageDto, userId: number) {
    // 1) Save user message
    const session = await this.sessionRepo.findOneBy({ id: dto.sessionId });
    await this.messageRepo.save(
      this.messageRepo.create({
        session,
        sender: 'user',
        content: dto.content,
      }),
    );

    // 2) Prepare Gemini API call
    const baseUrl = this.configService.get<string>('GEMINI_API_BASE_URL');
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');

    if (!baseUrl || !apiKey) {
      throw new Error('Gemini API configuration is missing.');
    }

    const payload = {
      contents: [
        {
          parts: [{ text: `${this.systemPrompt}\n\nUser: ${dto.content}` }],
        },
      ],
    };

    const response = await axios.post(`${baseUrl}?key=${apiKey}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const botText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Sorry, I couldn’t process that.';

    // 3) Save bot message
    await this.messageRepo.save(
      this.messageRepo.create({
        session,
        sender: 'bot',
        content: botText,
      }),
    );

    return { bot: botText };
  }
}
