// Core
import express from 'express';

// Handlers
import * as classes from './';
import * as classId from './class';
import * as gradebook from './gradebook';
import { authorization } from '../../helpers';

const route = express.Router();

route.get('/', classes.get);
route.post('/', authorization(), classes.post);

route.get('/:classId', authorization(), classId.get);
route.post('/', authorization(), classes.post);
route.put('/:classId', authorization(), classId.put);
route.delete('/:classId', authorization(), classId.remove);

route.get('/:classId/gradebook', authorization(), gradebook.get);
route.post('/:classId/gradebook', authorization(), gradebook.post);
route.put('/:classId/gradebook', authorization(), gradebook.put);
route.delete('/:classId/gradebook', authorization(), gradebook.remove);

export { route as classesRout };
