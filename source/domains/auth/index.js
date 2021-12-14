// Core
import dg from 'debug';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const sign = promisify(jwt.sign);
export const login = async (req, res, next) => {
    const { authorization: auth } = req.headers;

    if (!auth) {
        return res.status(401).json({ message: 'no auth header' });
    }

    const [ type, credentials ] = auth.split(' ');
    const [ email, password ] = Buffer.from(credentials, 'base64').toString()
        .split(':');

    if (password === '123456') {
        const token = await sign(req.body, key);

        storage.save({ token, key });

        res.setHeader('X-Token', token);

        return next();
    }

    return res.status(401).json({ message: 'credentials are not valid' });
};
