const express = require('express');
const auth = require('../middleware/auth.middleware');
const Basket = require('../models/Basket');
const router = express.Router({mergeParams: true});

// api/basket

router.get('/', auth, async (req, res) => {
    try {
        const list = await Basket.find();
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже',
        });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const newProduct = await Basket.create({
            ...req.body,
        });
        res.status(201).send(newProduct);
    } catch (e) {
        res.status(500).json({
            message: e.message,
        });
    }
});

module.exports = router;
