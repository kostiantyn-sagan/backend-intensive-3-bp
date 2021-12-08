import express from 'express';
import { error } from 'winston';

const route = express.Router();

const classes = [
    { id: 1, gradebook: [ '1', '2' ] },
    { id: 2, gradebook: [] },
];

route.get('/', (req, res) => {
    try {
        const data = [];

        res.status(200).json({ data });
    } catch ({message}) {
        res.status(400).json({ message });
    }
});

route.post('/', (req, res) => {
    try {
        const data = [];

        res.status(200).json({ data });
    } catch ({message}) {
        res.status(400).json({ message });
    }
});

route.get('/:classId', (req, res) => {
    try {
        const classesItem = classes.find((item) => item.id === parseInt(req.params.classId, 10));

        if (!classesItem) {
            return res.status(400).json({message: error.message});
        }


        res.status(200).json({ classesItem });
    } catch ({message}) {
        res.status(400).json({ message });
    }
});

route.post('/:classId', (req, res) => {
    try {
        res.status(200).json({ class: classes[ 0 ] });
    } catch ({message}) {
        res.status(400).json({ message });
    }
});

route.put('/:classId', (req, res) => {
    try {
        res.status(200).json({ class: classes[ 0 ] });
    } catch ({message}) {
        res.status(400).json({ message });
    }
});

route.delete('/:classId', (req, res) => {
    try {
        res.sendStatus(204);
    } catch ({message}) {
        res.status(400).json({ message });
    }
});

route.get('/:classId/gradebook', (req, res) => {
    try {
        const data = [];

        res.status(200).json({ data });
    } catch ({message}) {
        res.status(400).json({ message });
    }
});

route.post('/:classId/gradebook', (req, res) => {
    try {
        const data = [];

        res.status(200).json({ data });
    } catch ({message}) {
        res.status(400).json({ message });
    }
});

route.put('/:classId/gradebook', (req, res) => {
    try {
        const data = [];

        res.status(200).json({ data });
    } catch ({message}) {
        res.status(400).json({ message });
    }
});

route.delete('/:classId/gradebook', (req, res) => {
    try {
        res.sendStatus(204);
    } catch ({message}) {
        res.status(400).json({ message });
    }
});

export { route as classesRoute };
