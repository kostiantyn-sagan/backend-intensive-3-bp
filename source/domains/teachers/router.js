// Core
import express from 'express';

// Handlers
import * as teachers from './';
import * as subjects from './subjects';

// Instruments
import createTeacher from './_schemas/createTeacher';
import { validator, limiter, authenticate } from '../../helpers';

const route = express.Router();

route.get('/', teachers.get);
route.post('/', [ authenticate, limiter(1000, 60 * 1000), validator(createTeacher) ], teachers.post);

route.get('/:teacherId/subjects', [ authenticate ], subjects.get);
route.post('/:teacherId/subjects', [ authenticate ], subjects.post);

export { route as teachers };
