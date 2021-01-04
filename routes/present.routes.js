// /api/present/-
const { Router } = require('express');
const UsedStuffPresent = require('../models/UsedStuffPresent');
const { check, validationResult } = require('express-validator');

const router = Router();

router.post('/used-stuff',
    [
        check('email', 'Wrong email').isEmail()
    ]
    , async (req, res) => {
        try {
            const { name, lastName, email, phone, message, photo } = req.body;

            if (!name)
                return res.status(400).json({ message: 'Name is required' });
            if (!lastName)
                return res.status(400).json({ message: 'Last name is required' });
            if (!(email))
                return res.status(400).json({ message: 'Enter email' });

            const errors = validationResult(req.body);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array,
                    message: 'Wrong email'
                })
            }

            const usedStuffPresent = new UsedStuffPresent({ name, lastName, email, phone, message, photo });
            await usedStuffPresent.save();

            res.status(201).json({ message: 'Success! Santa has received your message!' });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    });

module.exports = router;