// /api/-
const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {
        try {
            res.status(201).json({ message: 'Well done' });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    });

module.exports = router;