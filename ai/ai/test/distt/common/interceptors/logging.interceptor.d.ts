import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { CustomLoggerService } from '../../core/logger/logger.service';
import { Observable } from 'rxjs';
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly logger;
    constructor(logger: CustomLoggerService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
