// Core
import express from 'express';

// Routes
import * as domains from './domains';

import { logger} from './helpers';

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use(logger());

app.use('/api/teachers', domains.teachers);
app.use('/api/pupils', domains.pupils);
app.use('/api/parents', domains.parents);
app.use('/api/classes', domains.classesRout);
app.use('/api/subjects', domains.subjects);

export { app };
