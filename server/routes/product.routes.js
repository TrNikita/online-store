const express = require('express');
const Product = require('../models/Product');
const router = express.Router({mergeParams: true});
const checkAdmin = require('../middleware/checkAdmin.middleware');

router.post('/', checkAdmin, async (req, res) => {
    try {
        const newProduct = await Product.create({
            ...req.body,
        });
        res.status(201).send(newProduct);
    } catch (e) {
        res.status(500).json({
            message: e.message,
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const list = await Product.find();
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже',
        });
    }
});

router.patch('/:productId', checkAdmin, async (req, res) => {
    try {
        const {productId} = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            {new: true},
        );
        res.send(updatedProduct);
    } catch (e) {
        res.status(500).json({
            message: e.message,
        });
    }
});

router.delete('/:productId', checkAdmin, async (req, res) => {
    try {
        const {productId} = req.params;
        const removedProduct = await Product.findById(productId);
        removedProduct.remove();
        res.status(201).send({message: 'Product deleted'});
    } catch (e) {
        res.status(500).json({
            message: e.message,
        });
    }
});

module.exports = router;
