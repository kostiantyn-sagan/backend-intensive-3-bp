import { createLogger, format, transports } from 'winston';
import path from 'path';

const { combine, timestamp, printf } = format;
const logFormat = printf(({ message, timestamp }) => `${timestamp} ${message}`);
const filename = path.resolve(path.join('logs', 'validation_errors.log'));

export const validationLogger = createLogger({
    level:      'error',
    format:     combine(timestamp(), logFormat),
    transports: [ new transports.File({filename, level: 'error'}) ],
});
