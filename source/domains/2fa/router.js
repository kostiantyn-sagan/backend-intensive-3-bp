// Core
import express from 'express';

// Handlers
import * as twoFa from './';

const router = express.Router();

router.get('/start', twoFa.getStart);
router.post('/start', twoFa.postStart);

router.get('/register', twoFa.getRegister);
router.post('/register', twoFa.postRegister);

router.get('/setup-2fa', twoFa.getSetup);
router.post('/setup-2fa', twoFa.postSetup);

router.get('/profile', twoFa.profile);

router.get('/logout', twoFa.logout);

export { router as twoFaRouter };
