// Core
import mongoose from 'mongoose';
import dg from 'debug';

// Instruments
import { getDBUrl } from '../utils';

// const debug = dg('db');
// const { DB_URL } = getDBUrl();

// const mongooseOptions = {
//     promiseLibrary:     global.Promise,
//     poolSize:           50,
//     keepAlive:          30000,
//     connectTimeoutMS:   5000,
//     useNewUrlParser:    true,
//     useFindAndModify:   false,
//     useCreateIndex:     true,
//     useUnifiedTopology: true,
//     autoIndex:          false,
// };

// const connection = mongoose.connect(
//     DB_URL,
//     mongooseOptions,
// );

// connection
//     .then(() => {
//         debug('DB connected');
//     })
//     .catch(({ message }) => {
//         debug(`DB connected error ${message}`);
//     });
