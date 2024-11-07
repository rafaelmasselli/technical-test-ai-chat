import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatDtoRepository } from './repositories/chat.repository';
import { ChatDto } from './dto/chatDto';
import { generativeModel } from '../../core/connection/vertex';

@Module({
  imports: [TypeOrmModule.forFeature([ChatDto, ChatDtoRepository])],
  controllers: [ChatController],
  providers: [
    ChatService,
    {
      provide: 'GenerativeModel',
      useValue: generativeModel,
    },
  ],
})
export class ChatModule {}
