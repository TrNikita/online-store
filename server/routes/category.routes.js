const express = require('express');
const checkAdmin = require('../middleware/checkAdmin.middleware');
const Category = require('../models/Category');
const router = express.Router({mergeParams: true});
const CyrillicToTranslit = require('cyrillic-to-translit-js');

// api/category

router
    .route('/')
    .get(async (req, res) => {
        try {
            const list = await Category.find();
            res.send(list);
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже',
            });
        }
    })
    .post(checkAdmin, async (req, res) => {
        try {
            const cyrillicToTranslit = new CyrillicToTranslit();
            const path = cyrillicToTranslit
                .transform(req.body.name, '_')
                .toLowerCase();

            const {name} = req.body;
            const existingCategory = await Category.findOne({name});
            // проверка на наличие категории
            if (existingCategory)
                return res.status(400).json({
                    error: {
                        message: 'CATEGORY_EXISTS',
                        code: 400,
                    },
                });

            const newCategory = await Category.create({
                ...req.body,
                path: path,
            });
            console.log('newCategory', newCategory);
            res.status(201).send(newCategory);
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    });

router.delete('/:categoryId', checkAdmin, async (req, res) => {
    try {
        const {categoryId} = req.params;
        const removedCategory = await Category.findById(categoryId);
        await removedCategory.remove();
        return res.send({message: `${categoryId} удален`});
    } catch (e) {
        res.status(500).json({
            message: e.message,
        });
    }
});

module.exports = router;
