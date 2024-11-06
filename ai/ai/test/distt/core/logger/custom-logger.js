"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonConfig = void 0;
const winston = require("winston");
exports.winstonConfig = {
    levels: winston.config.npm.levels,
    format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.errors({ stack: true }), winston.format.splat(), winston.format.json()),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
};
//# sourceMappingURL=custom-logger.js.map