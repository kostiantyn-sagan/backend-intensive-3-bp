// Core
import express from 'express';

// Handlers
import * as subject from './';
import * as seasons from './seasons';
import * as season from './seasons/season';
import * as lessons from './seasons/lessons';
import * as lesson from './seasons/lessons/lesson';
import { authorization } from '../../helpers';

const route = express.Router();

route.get('/:subjectsId', subject.get);
route.post('/:subjectsId', authorization(), subject.post);
route.put('/:subjectsId', authorization(), subject.put);
route.delete('/:subjectsId', authorization(), subject.remove);

route.get('/:subjectsId/seasons', seasons.get);
route.post('/:subjectsId/seasons', authorization(), seasons.post);

route.get('/:subjectsId/seasons/:seasonId', season.get);
route.post('/:subjectsId/seasons/:seasonId', authorization(), season.post);
route.put('/:subjectsId/seasons/:seasonId', authorization(), season.put);
route.delete('/:subjectsId/seasons/:seasonId', authorization(), season.remove);

route.get('/:subjectsId/seasons/:seasonId/lessons', lessons.get);
route.post('/:subjectsId/seasons/:seasonId/lessons', authorization(), lessons.post);

route.get('/:subjectsId/seasons/:seasonId/lessons/:lessonId', lesson.get);
route.post('/:subjectsId/seasons/:seasonId/lessons/:lessonId', authorization(), lesson.post);
route.put('/:subjectsId/seasons/:seasonId/lessons/:lessonId', authorization(), lesson.put);
route.delete('/:subjectsId/seasons/:seasonId/lessons/:lessonId', authorization(), lesson.remove);

export { route as subjects };
