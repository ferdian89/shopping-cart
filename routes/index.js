var express = require('express');
var router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

const Product = require('../models/product');

//const csrfProtection = csrf();
//router.use(csrfProtection);

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
/*
router.get('/user/signup', function(req, res, next) {
  res.render('user/signup', {csrfToken: req.csrfToken()});
});
*/
router.get('/user/signup', function(req, res, next) {
  res.render('user/signup');
});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/user/profile', function(req, res, next) {
  res.render('user/profile')
})

module.exports = router;
