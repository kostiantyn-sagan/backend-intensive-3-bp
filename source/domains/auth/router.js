// Core
import express from 'express';

// Handlers
import * as auth from './';

// Instruments
import { authenticate } from '../../helpers';

const route = express.Router();

route.post('/login', auth.login);

export {route as routerAuth};
