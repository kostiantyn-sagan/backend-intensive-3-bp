// Core
import express from 'express';

// Handlers
import * as parent from './parent';
import * as pupils from './pupils';
import * as person from './pupils/person';

// Instruments
import { authenticate } from '../../helpers';

const route = express.Router();

route.get('/:parentId', [ authenticate ], parent.get);
route.post('/:parentId', [ authenticate ], parent.post);
route.put('/:parentId', [ authenticate ], parent.put);
route.delete('/:parentId', [ authenticate ], parent.remove);

route.get('/:parentId/pupils', [ authenticate ], pupils.get);
route.post('/:parentId/pupils', [ authenticate ], pupils.post);

route.get('/:parentId/pupils/:personId', [ authenticate ], person.get);
route.post('/:parentId/pupils/:personId', [ authenticate ], person.post);
route.put('/:parentId/pupils/:personId', [ authenticate ], person.put);
route.delete('/:parentId/pupils/:personId', [ authenticate ], person.remove);

export { route as parents };
