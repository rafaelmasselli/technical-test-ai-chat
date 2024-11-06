import { LoggerService } from '@nestjs/common';
import { Logger } from 'winston';
export declare class CustomLoggerService implements LoggerService {
    private readonly logger;
    constructor(logger: Logger);
    log(message: string, context?: string): void;
    error(message: string, trace?: string, context?: string): void;
    warn(message: string, context?: string): void;
    debug(message: string, context?: string): void;
    verbose(message: string, context?: string): void;
}
