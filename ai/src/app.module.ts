import { Module } from '@nestjs/common';
import { LoggerModule } from './core/logger/logger.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [LoggerModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
