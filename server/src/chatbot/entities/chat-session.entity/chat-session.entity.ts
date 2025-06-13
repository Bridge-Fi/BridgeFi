// src/chat-session.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from '../message.entity/message.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'chat_session' })
export class ChatSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sessions, { nullable: true })
  user?: User;

  @OneToMany(() => Message, (m) => m.session, { cascade: true })
  messages: Message[];

  @CreateDateColumn({ name: 'started_at' })
  startedAt: Date;

  @UpdateDateColumn({ name: 'last_activity' })
  lastActivity: Date;
}
