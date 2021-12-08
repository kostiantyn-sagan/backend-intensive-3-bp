// Core
import { createLogger, transports, format } from 'winston';
import { getEnv as env } from './getEnv';

// Helpers
const { combine, timestamp, label, printf } = format;
const serverFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const logg = createLogger({
    level:      'debug',
    format:     combine(label({ label: 'server' }), timestamp(), serverFormat),
    transports: [ new transports.File({ filename: 'logs/main.log' }) ],
});

if (env('NODE_ENV') === 'development') {
    logg.add(new transports.Console({
        format: format.simple(),
    }));
}

export const logger = () => (req, res, next) => {
    try {
        logg.debug(`${req.method} ${JSON.stringify(req.body)}`);

        next();
    } catch (error) {
        res.status(500).send('Logger crash');
    }
};
