// Core
import express from 'express';

const router = express.Router();

router.route('/:seasonsId').get((req, res) => {
    try {
        res.status(200).json({ data: [ 'season1', 'season2' ] });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
    .post();

export { router as seasonsRouter };
