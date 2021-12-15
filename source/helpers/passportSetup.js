// Core
import { Strategy as TwoFAStrategy, GoogeAuthenticator } from 'passport-2fa-totp';
import {Strategy as LocalStrategy} from 'passport-local';

// Instruments
import Db from './db';

const PASSWORD = '123456789';
const timestamp = () => Date.now();
const key = timestamp();
const db = new Db();
db.set(key, {
    id:       key,
    username: 'user1',
    password: PASSWORD,
    secret:   '',
});

export const passportSetup = function (passport) {
    const INVALID_LOGIN = 'Invalid username or password';

    passport.serializeUser(function (user, done) {
        return done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        if (db.has(id)) {
            return done(null, db.get(id));
        }

        // return done(new Error('Not found user'));
        return done(null, false, { message: 'Not found user' });
    });

    passport.use(new TwoFAStrategy({
        usernameField: 'username',
        passwordField: 'password',
        codeField:     'code',
    }, function (username, password, done) {
        // 1st step verification: username and password

        process.nextTick(function () {
            const user = db.getBy({ username });
            if (!user /*|| user.password !== PASSWORD*/) {
                return done(null, false, { message: INVALID_LOGIN });
            }

            return done(null, user);
        });
    }, function (user, done) {
        // 2nd step verification: TOTP code from Google Authenticator
        if (!user.secret) {
            return done(new Error('Google Authenticator is not setup yet.'));
        }
        // Google Authenticator uses 30 seconds key period
        // https://github.com/google/google-authenticator/wiki/Key-Uri-Format

        const secret = GoogeAuthenticator.decodeSecret(user.secret);

        return done(null, secret, 30);
    }));

    passport.use(new LocalStrategy((username, password, done) => {
        if (!/^[A-Za-z0-9_@.]+$/g.test(username)) {
            return done(null, false, { message: 'Invalid username' });
        }

        if (password.length === 0) {
            return done(null, false, { message: 'Password is required' });
        }

        const user = db.getBy({ username: username });
        if (!user) {
            const key = timestamp();
            db.set(key, { id: key, username, password });

            return done(null, db.get(key));
        }

        // return done(null, user);
        return done(null, false, { message: 'Username already exist' });
    }));
};
