export class ChatDto {
  message: string;
  role: 'user' | 'ai';
  timestamp: Date;
}
