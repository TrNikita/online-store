const express = require('express');
const Product = require('../models/Product');
const router = express.Router({mergeParams: true});
const checkAdmin = require('../middleware/checkAdmin.middleware');
const {check, validationResult} = require('express-validator');

router.post('/', checkAdmin, async (req, res) => {
    try {
        const {name} = req.body;
        const existingProduct = await Product.findOne({name});
        // проверка на наличие продукта
        if (existingProduct)
            return res.status(400).json({
                message: 'PRODUCT_EXISTS',
            });

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

router.patch('/:productId', [
    checkAdmin,
    check('name', 'Название обязательно для заполнения').exists(),
    check('price', 'Цена обязательна для заполнения').exists(),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({
                    message: 'INVALID_DATA',
                    errors: errors.array(),
                });
            const updatedProduct = await Product.findByIdAndUpdate(
                req.body._id,
                req.body,
                {new: true},
            );
            console.log('updatedProduct', updatedProduct);
            res.send(updatedProduct);
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    },
]);

router.delete('/:productId', checkAdmin, async (req, res) => {
    try {
        const {productId} = req.params;
        const removedProduct = await Product.findById(productId);
        removedProduct.remove();
        res.status(200).send({
            message: `Product ${removedProduct.name} deleted`,
        });
    } catch (e) {
        res.status(500).json({
            message: e.message,
        });
    }
});

module.exports = router;
