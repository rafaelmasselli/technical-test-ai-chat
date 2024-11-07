import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatDto } from 'src/modules/chat/dto/chatDto';
import { Prompt } from 'src/core/useCases/promptAi';

@Injectable()
export class ChatService {
  constructor(
    @Inject('GenerativeModel') private readonly generativeModel: any,
    @InjectRepository(ChatDto)
    private readonly chatRepository: Repository<ChatDto>,
  ) {}

  async handleAiChat(userInput: string): Promise<string> {
    try {
      const userMessage = new ChatDto();
      userMessage.message = userInput;
      userMessage.role = 'user';
      const savedUserMessage = await this.chatRepository.save(userMessage);

      const streamingResult = await this.generativeModel.generateContentStream(
        Prompt(userInput),
      );
      let responseText = '';

      for await (const item of streamingResult.stream) {
        console.log('Item do stream:', JSON.stringify(item, null, 2));

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
}
