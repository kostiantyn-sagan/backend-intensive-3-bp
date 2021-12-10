import { errorLogger } from './logger';

export const notFoundHandler = (req, res) => {
    errorLogger.log({
        level:   'error',
        message: 'Not found route ' + req.url,
    });
    res.sendStatus(404);
};

export const errorHandler = (error, req, res) => {
    errorLogger.log({
        level:   'error',
        message: error.message,
    });
    res.status(500).json({ message: error.message });
};
