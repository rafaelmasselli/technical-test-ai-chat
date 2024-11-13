import { Controller, Post, Body, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ChatService } from './chat.service';
import { IChat } from '../../common/interface/chat';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post()
  async getChat(@Body() body: IChat, @Res() res: FastifyReply) {
    try {
      const { id, message } = body;
      const response = await this.chatService.handleAiChat(id, message) 
      return res.status(200).send({ response });
    } catch (error) {
      console.error('Erro no controlador de chat:', error);
      return res.status(500).send({ error: 'Erro ao processar o chat com AI' });
    }
  }
}
