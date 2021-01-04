const { Router } = require('express');
const Msg = require('../models/MsgReceive');
const { check, validationResult } = require('express-validator');

const router = Router();

// /api/receive/msg
router.post('/msg',
    [
        check('email', 'Wrong email').isEmail()
    ]
    , async (req, res) => {
        try {
            const { name, lastName, email, phone, giftPack, description } = req.body;
            if (!name)
                return res.status(400).json({ message: 'Name is required' });
            if (!lastName)
                return res.status(400).json({ message: 'Last name is required' });
            if (!(email || phone))
                return res.status(400).json({ message: 'Enter email or phone' });

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array,
                    message: 'Wrong email'
                })
            }


            const msg = new Msg({ name, lastName, email, phone, giftPack, description });
            await msg.save();

            res.status(201).json({ message: 'Success! Santa has received your message!' });
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    })
    
module.exports = router;