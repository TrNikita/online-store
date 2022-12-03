const tokenService = require('../service/token.service');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next;
    }

    try {
        // Bearer gwefewfwfwwegwegw
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        const data = tokenService.validateAccess(token);

        if (!data) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        req.user = data; //после выполнения middleware у req будет параметр user c _id

        next(); //чтобы цепочка продолжалась
    } catch (e) {
        res.status(401).json({message: 'Unauthorized'});
    }
};
