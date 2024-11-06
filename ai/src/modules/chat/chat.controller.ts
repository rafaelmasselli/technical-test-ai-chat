import { Controller, Get, Req, Res } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Controller('chat')
export class ChatController {
  @Get()
  getChat(@Res() res: FastifyReply) {
    return res.status(200).send('Hello world');
  }
}
