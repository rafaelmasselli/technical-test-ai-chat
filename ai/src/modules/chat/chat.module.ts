import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ClientHistoryService } from './chatHistory.service';
import { ChatController } from './chat.controller';
import { ConfigChatService } from './configChat.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ClientHistoryService, ConfigChatService],
})
export class ChatModule {}
