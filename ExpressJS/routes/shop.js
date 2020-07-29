const express = require('express');
const path = require('path');
const shopController = require('../controllers/products') ;

const router = express.Router();

router.get('/',shopController.getIndex);

router.get('/cart',shopController.getCart);
router.post('/cart', shopController.postCart);

router.get('/products',shopController.getProducts);

router.get('/product-detail/:id',shopController.getProductById);

router.get('/check-out', shopController.getCheckOut);

router.get('/shop/orders', shopController.getOrders);

module.exports = router;    