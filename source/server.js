// Core
import express from 'express';
import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// Routes
import * as domains from './domains';

// Instruments
import {
    devLogger,
    errorLogger,
    notFoundLogger,
    validationLogger,
    requireJsonContent,
    getPassword,
    NotFoundError,
} from './helpers';

const app = express();
const key = getPassword();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:    key,
};

passport.use(
    new JwtStrategy(options, (jwtPayload, done) => {
        const { email } = jwtPayload;

        return done(null, {email});
    }),
);

app.use(
    express.json({
        limit: '10kb',
    }),
);

app.use(requireJsonContent);

if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        const body = req.method === 'GET' ? 'Body not supported for GET' : JSON.stringify(req.body, null, 2);

        devLogger.debug(`${req.method}\n${body}`);
        next();
    });
}

app.use('/api/auth', domains.auth);
app.use('/api/teachers', domains.teachers);
app.use('/api/pupils', domains.pupils);
app.use('/api/parents', domains.parents);
app.use('/api/classes', domains.classes);
app.use('/api/subjects', domains.subjects);


app.use('*', (req, res, next) => {
    const error = new NotFoundError(
        `Can not find right route for method ${req.method} and path ${req.originalUrl}`,
        404,
    );
    next(error);
});

if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-unused-vars
    app.use((error, req, res, next) => {
        const { name, message, statusCode } = error;
        const errorMessage = `${name}: ${message}`;

        switch (error.name) {
            case 'NotFoundError':
                notFoundLogger.error(errorMessage);
                break;

            case 'ValidationError':
                validationLogger.error(errorMessage);
                break;

            default:
                errorLogger.error(errorMessage);
                break;
        }

        const status = statusCode ? statusCode : 500;
        res.status(status).json({ message: message });
    });
}

export { app };
