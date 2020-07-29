const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();

//----/admin/add-product => GET
router.get('/add-products', adminController.getAddProduct);
//----/admin/add-product => POST
router.post('/add-products', adminController.postAddProduct);

//----/admin/products => GET
router.get('/products', adminController.getAdminProd);
//----/admin/edit-product => POST (UPDATE)
router.get('/edit-product/:id',adminController.editProd);
router.post('/edit-product',adminController.postProductEdited);

//----/admin/delete-product => DELETE
router.post('/delete-product:id',adminController.deleteProduct);
//---------exportar los routers para poder utilizarlos desde app.js
module.exports = router;