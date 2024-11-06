import * as winston from 'winston';
export declare const winstonConfig: {
    levels: winston.config.NpmConfigSetLevels;
    format: winston.Logform.Format;
    transports: (winston.transports.ConsoleTransportInstance | winston.transports.FileTransportInstance)[];
};
