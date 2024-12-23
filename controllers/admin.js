const { where } = require('sequelize');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  })
    .then((result) => {
      console.log("created product record");
      res.redirect('/admin/products');
    })
    .catch((err) => {
      console.log(err);
    });

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {

      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
    
      });
    })

  .catch ((err) => { console.log(err) });
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
  .then((product) => {
    console.log(product);
    product.title = updatedTitle;
    product.price =updatedPrice;
    product.description =updatedDesc;
    product.imageUrl =updatedImageUrl;
    return product.save();
    
  })
  .then((result)=>{
    console.log(result);
  })
.catch ((err) => { console.log(err) });
  
    res.redirect('/admin/products');


};
exports.getProducts = (req, res, next) => {
  req.user
  .getProducts()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then((product)=>{
     return product.destroy();
    
  })
  .then((result)=>{
    console.log("product deleted");
    res.redirect('/admin/products');
  })
  .catch((err)=>{
    console.log(err);
  });
 
};
