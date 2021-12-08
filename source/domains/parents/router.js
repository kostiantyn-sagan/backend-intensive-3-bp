// Core
import express from 'express';

// Handlers
import * as parent from './parent';
import * as pupils from './pupils';
import * as person from './pupils/person';
import { authorization } from '../../helpers';

const route = express.Router();

route.get('/:parentId', authorization(), parent.get);
route.post('/:parentId', authorization(), parent.post);
route.put('/:parentId', authorization(), parent.put);
route.delete('/:parentId', authorization(), parent.remove);

route.get('/:parentId/pupils', authorization(), pupils.get);
route.post('/:parentId/pupils', authorization(), pupils.post);

route.get('/:parentId/pupils/:personId', authorization(), person.get);
route.post('/:parentId/pupils/:personId', authorization(), person.post);
route.put('/:parentId/pupils/:personId', authorization(), person.put);
route.delete('/:parentId/pupils/:personId', authorization(), person.remove);

export { route as parents };
