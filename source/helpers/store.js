import { Store } from 'express-session';
import dg from 'debug';

const debug = dg('session:store');

export class StoreCustom extends Store {
    constructor(options) {
        super(options);
        this.storage = new Map();
    }

    destroy(sid, callback) {
        debug('destroy', sid);
        callback();
    }

    clear(callback) {
        debug('clear');
        callback();
    }

    length(callback) {
        debug('length');
        callback();
    }

    get(sid, callback) {
        debug('get', sid);
        callback();

        return this.storage.get(sid);
    }

    set(sid, session, callback) {
        const { user } = session;
        if (!user || !user.payload || !user.payload.email) {
            callback(new Error('should be email prop'));
        }

        this.storage.set(sid, session);
        callback();
    }

    getAll() {
        return Array.from(this.storage);
    }

    clearAll() {
        return this.storage.clear();
    }
}
