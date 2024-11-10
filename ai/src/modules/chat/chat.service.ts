import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatDto } from '../../modules/chat/dto/chatDto';

@Injectable()
export class ChatService {
  constructor(
    @Inject('GenerativeModel') private readonly generativeModel: any,
    @InjectRepository(ChatDto)
    private readonly chatRepository: Repository<ChatDto>,
  ) {}

  async handleAiChat(userInput: string): Promise<string> {
    try {
      const history = this.getUserMessagesHistory();
      const prompt = `${history} | ${userInput}`;
      const userMessage = new ChatDto();
      userMessage.message = userInput;
      userMessage.role = 'user';
      await this.chatRepository.save(userMessage);

      const streamingResult =
        await this.generativeModel.generateContentStream(prompt);
      let responseText = '';

      for await (const item of streamingResult.stream) {
        if (item.candidates && Array.isArray(item.candidates)) {
          const candidate = item.candidates[0]?.content;
          if (candidate && Array.isArray(candidate.parts)) {
            candidate.parts.forEach((part) => {
              if (part.text) {
                responseText += part.text + ' ';
              }
            });
          }
        }
      }

      const aiMessage = new ChatDto();
      aiMessage.message = responseText.trim() || 'Sem resposta do modelo.';
      aiMessage.role = 'ai';
      await this.chatRepository.save(aiMessage);
      return responseText.trim() || 'Sem resposta do modelo.';
    } catch (error) {
      console.error('Erro ao gerar resposta do modelo:', error);
      throw new Error('Erro ao processar a resposta do AI');
    }
  }

  private async getUserMessagesHistory(): Promise<string> {
    const userMessages = await this.chatRepository.find({
      where: { role: 'user' },
      order: { timestamp: 'ASC' },
    });

    let concatenatedMessages = '';
    userMessages.forEach((message) => {
      concatenatedMessages += message.message + ' | ';
    });

    return concatenatedMessages.trim();
  }
}
