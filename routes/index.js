var express = require('express');
var router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

const Product = require('../models/product');
const Cart = require('../models/cart');

const csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs) {
      var productChunk = [];
      var chunckSize = 3;
      for (var i = 0; i < docs.length; i += chunckSize) {
        productChunk.push(docs.slice(i, i + chunckSize));
      }
      res.render('shop/index', { title: 'Shopping Card', products: productChunk });
  });
});

router.get('/add-to-cart/:id', (req, res, next) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items :{}});

  Product.findById(productId, function(err, product) {
    if(err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    console.log(req.session.cart = cart);
    res.redirect('/');
  });
});

module.exports = router;
