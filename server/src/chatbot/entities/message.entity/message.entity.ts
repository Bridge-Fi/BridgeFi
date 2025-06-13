import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ChatSession } from '../chat-session.entity/chat-session.entity';

@Entity({ name: 'message' })
export class Message {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => ChatSession, (session) => session.messages)
  session: ChatSession;

  @Column({ type: 'enum', enum: ['user', 'bot', 'system'], default: 'user' })
  sender: 'user' | 'bot' | 'system';

  @Column('text')
  content: string;

  @CreateDateColumn({ name: 'sent_at' })
  sentAt: Date;
}
