import { Module } from '@nestjs/common';
import { LoggerModule } from './core/logger/logger.module';
import { ChatModule } from './modules/chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './common/config/secret/typeOrmConfig';

@Module({
  imports: [LoggerModule, ChatModule, TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
