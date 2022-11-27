const Router = require('express');
const router = new Router();
const productController = require('../controller');

console.log('productController', productController);

router.get('/', productController.getProducts);

module.exports = router;
