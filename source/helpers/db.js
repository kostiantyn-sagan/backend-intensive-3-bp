const closure = new Map();

export default class Db {
    constructor() {
        this.store = closure;
    }

    get(key) {
        return this.store.get(key);
    }

    getBy(prop = { foo: 'bar' }) {
        const [ property ] = Object.keys(prop);
        // eslint-disable-next-line no-undef-init
        let by = undefined;
        this.store.forEach((value) => {
            if (value[ property ] && value[ property ] === prop[ property ]) {
                console.log('getBy -->', value);
                by = value;
            }
        });

        return by;
    }

    has(key) {
        return this.store.has(key);
    }

    getAll() {
        const keys = [ ...this.store.keys() ];
        const values = [ ...this.store.values() ];

        return values.reduce((obj, value, index) => ({ ...obj, [ keys[ index ] ]: value }), {});
    }

    set(key, value) {
        console.log('db:set -->', key, value);
        this.store.set(key, value);
    }

    update(key, value) {
        const old = this.store.get(key);
        this.store.delete(key);
        console.log('db:update -->', { ...old, ...value });
        this.set(key, {...old, ...value});
    }
}
