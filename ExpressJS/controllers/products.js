const ProdMod = require('../models/product');
const { static } = require('express');
const Producto = require('../models/product');
const cart = require('../models/cart');


//-------------/routes/shop
exports.getProducts = (req, res, next) => {
  ProdMod.traerProducto(prod=> {
    res.render('shop/product-list', {
      prods: prod,
      pageTitle: 'Add products',
      path: '/products',
      hasProducts: prod.length > 0,
      activeShop: true,
    });
  });
};
exports.getCart = (req, res, next) => {
  res.render('shop/cart', 
  { pageTitle: 'Cart', path: '/cart', activeCart: true });
}
exports.postCart = (req,res,next) => {
  const prodId = req.body.id;
  Producto.getById(prodId,prod=>{
    cart.addProduct(prodId,prod.price);
  });
  res.redirect('/cart');
};

exports.getIndex = (req, res, next) => {
  ProdMod.traerProducto(prod=> {
    res.render('shop/index', {
      prods: prod,
      pageTitle: 'Index',
      path: '/',
      hasProducts: prod.length > 0,
      activeShop: true,
    });
  });
};
exports.getOrders = (req,res,next)=>{
  res.render('shop/orders',{
    pageTitle: 'Orders'
  });
};
exports.getCheckOut =(req,res,next)=>{
  res.render('shop/checkout',{ 
    pageTitle:'Checkout'
  }
  );
};
exports.getProductById = (req,res,next)=>{
  const prodId = req.params.id;
  Producto.getById(prodId,product =>{
    res.render('shop/product-detail',{
      prods: product,
      pageTitle: 'Edit details',
        path: '/shop/product-detail',
      });
  });
};