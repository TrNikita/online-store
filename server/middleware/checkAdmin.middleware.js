const tokenService = require('../service/token.service');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') return next;

    try {
        // Bearer gwefewfwfwwegwegw
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({message: 'Unauthorized'});

        const data = tokenService.validateAccess(token);
        if (!data) return res.status(401).json({message: 'Unauthorized'});

        const {role} = await User.findById(data);
        if (role !== 'ADMIN')
            return res
                .status(401)
                .json({message: 'Access denied. Only for ADMIN'});

        req.user = data; // после выполнения middleware у req будет параметр user c _id

        next(); // чтобы цепочка продолжалась
    } catch (e) {
        res.status(401).json({message: 'Unauthorized'});
    }
};
