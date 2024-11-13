import { Injectable } from '@nestjs/common';
import { ClientHistoryService } from './chatHistory.service';
import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import { apiKey } from 'src/common/config/secret/apiKey';
import { ConfigChatService } from './configChat.service';

@Injectable()
export class ChatService {
  private genAI: GoogleGenerativeAI;
  private configChatService: ConfigChatService;

  constructor(
    private readonly clientHistoryService: ClientHistoryService,
    configChatService: ConfigChatService,
  ) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.configChatService = configChatService;
  }
  async generateResponse(
    message: string,
    clientId: string,
    userName: string,
  ): Promise<string> {
    try {
      const conversationHistory = await this.getConversationHistory(clientId);
      const context = conversationHistory.join('\n');
      const modelConfig = await this.configChatService.getConfig();
      const model = await this.genAI.getGenerativeModel({
        model: modelConfig.textModel,
        systemInstruction: `${modelConfig.prompt.join(',')}, O nome do usuario é '${userName}'`,
        safetySettings: modelConfig.filters,
      });

      const request: Array<string | Part> = [
        modelConfig.prompt.join('\n'),
        `Histórico da conversa: ${context}`,
        `Cliente: ${message}`,
        'IA:',
      ];

      console.log(request);

      const result = await model.generateContent(request);
      return result.response.text().trim();
    } catch (error) {
      console.error('Erro ao chamar o Vertex AI:', error);
      return 'Desculpe, ocorreu um erro ao processar sua mensagem.';
    }
  }
  async getConversationHistory(clientId: string): Promise<string[]> {
    try {
      const history = await this.clientHistoryService.getMessages(clientId);
      return history.map((msg) => `${msg.sender}: ${msg.content}`);
    } catch (error) {
      console.error('Erro ao obter histórico de mensagens:', error);
      return [];
    }
  }

  async clearConversationHistory(clientId: string): Promise<void> {
    try {
      await this.clientHistoryService.clearMessages(clientId);
    } catch (error) {
      console.error('Erro ao limpar histórico de mensagens:', error);
    }
  }

  async handleAiChat(
    clientId: string,
    message: string,
    userName: string,
  ): Promise<string> {
    const aiResponse = await this.generateResponse(message, clientId, userName);
    await this.clientHistoryService.saveMessage(clientId, 'user', message);
    await this.clientHistoryService.saveMessage(clientId, 'ia', aiResponse);
    return aiResponse;
  }
}
