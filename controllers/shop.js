const Product = require('../models/product');
const Cart = require('../models/cart');
const { where } = require('sequelize');



exports.getProducts = (req, res, next) => {

  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch((err) => {
      console.log(err);
    });



};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({ where: { id: prodId } })
    .then(product => {
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch((err) => {
      console.log(err);
    });


};

exports.getCart = (req, res, next) => {

  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts()
        .then((products) => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })


};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchCart;
  req.user
    .getCart()
    .then(cart => {
      fetchCart = cart;

      return cart.getProducts({ where: { id: prodId } });

    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let newQty = 1;

      if (product) {

      }
      return Product.findByPk(prodId)
        .then((product) => {
          return fetchCart.addProduct(product, { through: { quantity: newQty } });
        })
        .catch((err) => {
          console.log(err);
        })
    })
    .catch((err) => {
      console.log(err);
    })
  res.redirect('/cart');
};



exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
