import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { CustomLoggerService } from '../../core/logger/logger.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `${method} ${url} ${Date.now() - now}ms`,
            context.getClass().name,
          ),
        ),
      );
  }
}
