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
You are BridgeFi's virtual immigration assistant. Your user is an international
visa applicant who needs up-to-date, accurate guidance on U.S. immigration processes,
embassy fees, required documents, timelines, and country-specific visa rules.
Be concise, refer only to official sources, and always clarify if you need more details
(e.g., country of origin, visa category). Your tone is friendly, professional, and supportive.
You need to evaluate the user's situation and provide the most suitable visa options.
`.trim();

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ChatSession)
    private readonly sessionRepo: Repository<ChatSession>,
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async createSession(userId: number | null) {
    const session = this.sessionRepo.create({
      user: userId ? { id: userId } : null,
    });
    return this.sessionRepo.save(session);
  }

  async sendSystemPrompt(sessionId: number, userId: number | null) {
    const session = await this.sessionRepo.findOneBy({ id: sessionId });
    await this.messageRepo.save(
      this.messageRepo.create({
        session,
        sender: 'system',
        content: this.systemPrompt,
      }),
    );
  }

  async sendMessage(dto: SendMessageDto, userId: number | null) {
    const session = await this.sessionRepo.findOneBy({ id: dto.sessionId });
    await this.messageRepo.save(
      this.messageRepo.create({
        session,
        sender: 'user',
        content: dto.content,
      }),
    );

    let history: Message[];
    if (userId) {
      history = await this.messageRepo
        .createQueryBuilder('msg')
        .innerJoin('msg.session', 'sess')
        .where('sess.userId = :userId', { userId })
        .orderBy('msg.id', 'ASC')
        .getMany();
    } else {
      history = await this.messageRepo.find({
        where: { session: { id: dto.sessionId } },
        order: { id: 'ASC' },
      });
    }

    const conversation = history
      .map((m) =>
        m.sender === 'user'
          ? `User: ${m.content}`
          : m.sender === 'bot'
            ? `Assistant: ${m.content}`
            : m.content,
      )
      .join('\n\n');

    const payload = {
      contents: [
        {
          parts: [{ text: `${conversation}\n\nUser: ${dto.content}` }],
        },
      ],
    };

    const baseUrl = this.configService.get<string>('GEMINI_API_BASE_URL');
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!baseUrl || !apiKey) {
      throw new Error('Gemini API configuration is missing.');
    }

    const response = await axios.post(`${baseUrl}?key=${apiKey}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    const botText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Sorry, I couldn’t process that.';

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
