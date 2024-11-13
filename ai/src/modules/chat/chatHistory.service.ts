import { Injectable } from '@nestjs/common';

interface Message {
  clientId: string;
  content: string;
  timestamp: Date;
}

@Injectable()
export class ClientHistoryService {
  private messages: Map<string, { sender: string, content: string }[]> = new Map();

  async saveMessage(clientId: string, sender: string, message: string): Promise<void> {
    const clientMessages = this.messages.get(clientId) || [];
    clientMessages.push({ sender, content: message });
    this.messages.set(clientId, clientMessages);
  }

  async getMessages(clientId: string): Promise<{ sender: string, content: string }[]> {
    return this.messages.get(clientId) || [];
  }

  async clearMessages(clientId: string): Promise<void> {
    this.messages.delete(clientId);
  }
}
