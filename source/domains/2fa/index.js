// Core
import dg from 'debug';
import passport from 'passport';
import Db from '../../helpers/db';
import { GoogeAuthenticator } from 'passport-2fa-totp';

const db = new Db();

const authenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/2fa/start');
};

export const getStart = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/2fa/profile');
    }
    const errors = req.flash('error');

    return res.render('2fa', { errors }).end();
};

export const postStart = passport.authenticate('2fa-totp', {
    successRedirect:   '/2fa/profile',
    failureRedirect:   '/2fa/start',
    failureFlash:      true,
    badRequestMessage: 'Invalid code or user.',
});

export const getRegister = (req, res, next) => {
    const errors = req.flash('error');

    return res.render('register', { errors }).end();
};

export const postRegister = [
    passport.authenticate('local', {
        failureRedirect: '/2fa/register',
        failureFlash:    'Something wrong.',
        successFlash:    'Welcome!',
    }),
    (req, res) => { res.redirect('/2fa/setup-2fa'); },
];

export const getSetup = [
    authenticated, (req, res, next) => {
        const errors = req.flash('setup-2fa-error');
        const qrInfo = GoogeAuthenticator.register(req.user.username);
        req.session.qr = qrInfo.secret;

        return res.render('setup-2fa', { errors, qr: qrInfo.qr });
    },
];

export const postSetup = [
    authenticated, (req, res, next) => {
        if (!req.session.qr) {
            req.flash('setup-2fa-error', 'The Account cannot be registered. Please try again.');

            return res.redirect('/2fa/setup-2fa');
        }

        const user = db.get(req.user.id);
        if (!user) {
            req.logout();

            return res.redirect('/2fa/start');
        }
        db.update(req.user.id, { secret: req.session.qr });

        return res.redirect('/2fa/profile');
    },
];

export const profile = [
    authenticated, (req, res, next) => {
        return res.render('profile', {
            user: req.user,
        });
    },
];

export const logout = [
    authenticated, (req, res, next) => {
        req.logout();

        return res.redirect('/2fa/start');
    },
];
