import { getPassword } from './getPassword';

const password = getPassword();

export const authenticate =  (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization === password) {
        next();
    } else {
        res.status(401).json({ message: 'authentication credentials are not valid' });
    }
};
