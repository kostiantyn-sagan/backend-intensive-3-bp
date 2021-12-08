// Core
import express from 'express';
// import session from 'express-session';

// Instruments
import {classesRoute, subjectsRoute} from './routes';
// import {
//     sessionOptions,
// } from './utils';

// Routers

const app = express();


app.use('/classes', classesRoute);
app.use('/subjects', subjectsRoute);
// app.use(session(sessionOptions));
// app.use(express.json({ limit: '10kb' }));

export { app };
