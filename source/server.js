// Core
import express from 'express';
import session from 'express-session';
import path from 'path';
import flash from 'connect-flash';
import passport from 'passport';
import bodyParser from 'body-parser';

// Routes
import * as domains from './domains';
import { passportSetup } from './helpers';

// Instruments
import {
    errorLogger,
    notFoundLogger,
    validationLogger,
    getPassword,
    NotFoundError,
} from './helpers';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views-2fa'));
app.set('view engine', 'ejs');

const sessionOptions = {
    key:               'user',
    secret:            getPassword(),
    resave:            false,
    rolling:           true,
    saveUninitialized: false,
    cookie:            {
        httpOnly: true,
        maxAge:   15 * 60 * 1000,
    },
};


app.use(
    express.json({
        limit: '10kb',
    }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sessionOptions));
app.use(flash());

passportSetup(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use('/2fa', domains.twoFaRouter);


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
