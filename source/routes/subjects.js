import express from 'express';

import {seasonsRouter} from './subjects/season';

const route = express.Router();

route.param('subjectId', function (req, res, next, subjectId) {
    req.parentsParam = {
        subjectId,
    };

    return next();
});

route.get('/', (req, res) => {
    try {
        const data = [];

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

route.post('/', (req, res) => {
    try {
        const data = [];

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

route.get('/:subjectId', (req, res) => {
    try {
        const data = [];

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

route.post('/:subjectId', (req, res) => {
    try {
        const data = [];

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

route.use('/:subjectId/seasons', seasonsRouter);

export { route as subjectsRoute };
