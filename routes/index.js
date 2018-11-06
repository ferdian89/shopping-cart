var express = require('express');
var router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

const Product = require('../models/product');

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



module.exports = router;
