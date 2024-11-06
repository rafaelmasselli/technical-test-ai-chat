"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const logger_service_1 = require("./core/logger/logger.service");
const platform_fastify_1 = require("@nestjs/platform-fastify");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    const logger = app.get(logger_service_1.CustomLoggerService);
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(logger));
    await app.listen(4444);
}
bootstrap();
//# sourceMappingURL=main.js.map