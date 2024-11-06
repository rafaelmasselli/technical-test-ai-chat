import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { CustomLoggerService } from './core/logger/logger.service';
import { FastifyAdapter } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  const logger = app.get(CustomLoggerService);
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  await app.listen(4444);
}
bootstrap();
