import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './custom-logger';
import { CustomLoggerService } from './logger.service';

@Module({
  imports: [WinstonModule.forRoot(winstonConfig)],
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
