// Core
import dg from 'debug';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Instruments
import {getPassword} from '../../helpers';

const debug = dg('router:auth');
const sign = promisify(jwt.sign);
const key = getPassword();

export const post = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const { email, password } = req.body;
        const emailDecoded = Buffer.from(email, 'base64').toString();
        const passwordDecoded = Buffer.from(password, 'base64').toString();

        const token = await sign({ email: emailDecoded }, key);
        res.setHeader('X-Token', token);
        res.sendStatus(204);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
