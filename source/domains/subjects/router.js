// Core
import express from 'express';

// Handlers
import * as subject from './';
import * as seasons from './seasons';
import * as season from './seasons/season';
import * as lessons from './seasons/lessons';
import * as lesson from './seasons/lessons/lesson';

// Instruments
import { authenticate } from '../../helpers';

const route = express.Router();

route.get('/:subjectsId', subject.get);
route.post('/:subjectsId', [ authenticate ], subject.post);
route.put('/:subjectsId', [ authenticate ], subject.put);
route.delete('/:subjectsId', [ authenticate ], subject.remove);

route.get('/:subjectsId/seasons', seasons.get);
route.post('/:subjectsId/seasons', [ authenticate ], seasons.post);

route.get('/:subjectsId/seasons/:seasonId', season.get);
route.post('/:subjectsId/seasons/:seasonId', [ authenticate ], season.post);
route.put('/:subjectsId/seasons/:seasonId', [ authenticate ], season.put);
route.delete('/:subjectsId/seasons/:seasonId', [ authenticate ], season.remove);

route.get('/:subjectsId/seasons/:seasonId/lessons', lessons.get);
route.post('/:subjectsId/seasons/:seasonId/lessons', [ authenticate ], lessons.post);

route.get('/:subjectsId/seasons/:seasonId/lessons/:lessonId', lesson.get);
route.post('/:subjectsId/seasons/:seasonId/lessons/:lessonId', [ authenticate ], lesson.post);
route.put('/:subjectsId/seasons/:seasonId/lessons/:lessonId', [ authenticate ], lesson.put);
route.delete('/:subjectsId/seasons/:seasonId/lessons/:lessonId', [ authenticate ], lesson.remove);

export { route as subjects };
