const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const checkAdmin = require('../middleware/checkAdmin.middleware');

router.patch('/:userId', checkAdmin, async (req, res) => {
    try {
        console.log('req.body', req.body);
        const updatedUser = await User.findByIdAndUpdate(req.body._id, req.body, {
            new: true,
        });
        console.log('updatedUser', updatedUser);
        res.send(updatedUser);
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже',
        });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const list = await User.find();
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже',
        });
    }
});

router.delete('/:userId', checkAdmin, async (req, res) => {
    try {
        console.log('req', req.params);
        const {userId} = req.params;
        console.log('userId', userId);
        const removedUser = await User.findById(userId);
        await removedUser.remove();
        res.status(200).json({message: `${userId} удален`});
        // }
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже',
        });
    }
});

module.exports = router;
