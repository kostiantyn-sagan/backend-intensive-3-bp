// Core
import express from 'express';

// Handlers
import * as pupils from './';
import * as person from './person';
import { authorization } from '../../helpers';

const route = express.Router();

route.get('/', authorization(), pupils.get);
route.post('/', authorization(), pupils.post);

route.get('/:personId', authorization(), person.get);
route.post('/:personId', authorization(), person.post);
route.put('/:personId', authorization(), person.put);
route.delete('/:personId', authorization(), person.remove);

export { route as pupils };
