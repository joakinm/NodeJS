const Producto = require('../models/product');

//-----------/routes/admin 
//----GET Products
exports.getAddProduct = (req,res,next) =>{
  res.render('admin/edit-product', 
  { pageTitle: 'Add Product', 
  path: '/admin/add-products', 
  activeAddProduct: true,
  editing:false });
}

exports.getAdminProd = (req, res, next) => {
    res.render('admin/products', 
    { pageTitle: 'Admin Product', path: '/admin/products', activeAdminProd: true });
}
//----ADD products
exports.postAddProduct = (req,res,next) =>{
  const prod = new Producto(
    null,
    req.body.title,
    req.body.imgUrl,
    req.body.descrip, 
    req.body.price
    );
  prod.guardar() ;
    res.redirect('/');
};
//----EDIT products
exports.editProd = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.id;
  Producto.getById(prodId,product=>{
    if(!product){
      res.redirect('/');
    }
    res.render('admin/edit-product', {
    pageTitle: 'edit products',
    path: '/admin/edit-product',
    editing:editMode,
    prod : product
  });
});
}
exports.postProductEdited = (req,res,next)=>{
  const prodId = req.body.id;
  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const description = req.body.descrip;
  const price = req.body.price;
  const updatedProd = new Producto(prodId,title,imgUrl,description,price);
  console.log(updatedProd);
  updatedProd.guardar();
  res.redirect('/');
}
//----DELETE products
exports.deleteProduct = (req,res,next)=>{
  const id = req.params.id;
  const confirmation = confirm('are you sure to delete the post with id:' + Id +'?');
  if (confirmation){
    Producto.delete(id);
  }
}
