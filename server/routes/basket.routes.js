const express = require('express');
const auth = require('../middleware/auth.middleware');
const Basket = require('../models/Basket');
const router = express.Router({mergeParams: true});

// api/basket

router.get('/', auth, async (req, res) => {
    try {
        const list = await Basket.find();
        const userBasket = await list.find(
            (b) => String(b.userId) === req.user._id,
        );
        console.log('userBasket', userBasket);
        res.status(200).send(userBasket);
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже',
        });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const list = await Basket.find();
        const userBasket = await list.find((b) => b.userId === req.user._id);
        if (userBasket) {
            const updatedProducts = [...userBasket.products, req.body.products];
            const updatedBasket = await Basket.findByIdAndUpdate(
                userBasket._id,
                {products: updatedProducts},
                {
                    new: true,
                },
            );
            res.status(200).send(updatedBasket);
        } else {
            const newBasket = await Basket.create({
                userId: req.user._id,
                products: [req.body.products],
            });
            res.status(201).send(newBasket);
        }
    } catch (e) {
        res.status(500).json({
            message: e.message,
        });
    }
});

router.delete('/:productId', auth, async (req, res) => {
    try {
        const {productId} = req.params;
        const list = await Basket.find();
        const userBasket = await list.find((b) => b.userId === req.user._id);
        if (!userBasket) {
            return res.status(400).json({message: 'Basket does not exist'});
        }

        const removedProductIndex = await userBasket.products.findIndex(
            (p) => p === productId,
        );

        if (removedProductIndex > -1) {
            const updatedProducts = userBasket.products.slice();
            updatedProducts.splice(removedProductIndex, 1);
            console.log('updatedProducts', updatedProducts);
            const updatedBasket = await Basket.findByIdAndUpdate(
                userBasket._id,
                {products: updatedProducts},
                {
                    new: true,
                },
            );
            console.log('updatedBasket', updatedBasket);
            res.status(200).send(updatedBasket);
        } else {
            return res
                .status(400)
                .json({message: 'This product is not in the basket'});
        }
    } catch (e) {
        res.status(500).json({
            message: e.message,
        });
    }
});

module.exports = router;
