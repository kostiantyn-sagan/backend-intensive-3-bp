export class ValidationError extends Error {
    constructor(message, status) {
        super(message);
        Error.captureStackTrace(this, ValidationError);
        this.name = 'ValidationError';
        this.statusCode = status || 400;
    }
}

export class NotFoundError extends Error {
    constructor(message, status) {
        super(message);
        Error.captureStackTrace(this, ValidationError);
        this.name = 'NotFoundError';
        this.statusCode = status || 404;
    }
}
