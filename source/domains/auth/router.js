// Core
import express from 'express';

// Handlers
import * as authenticete from './';

const route = express.Router();

route.post('/login', authenticete.post);

export {route as auth};
