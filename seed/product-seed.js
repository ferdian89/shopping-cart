const Product = require('../models/product');
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shopping', { useNewUrlParser: true});

const products = [
  new Product ({
    imagePath: "/images/pexels-photo-1198817.jpeg",
    title: 'This is a wider card with supporting text',
    description: 'Awesome game',
    price: 10
  }),
  new Product ({
    imagePath: "/images/pexels-photo-1198817.jpeg",
    title: 'This is a wider card with supporting text',
    description: 'Awesome game',
    price: 20
  }),
  new Product ({
    imagePath: "/images/pexels-photo-1198817.jpeg",
    title: 'This is a wider card with supporting text',
    description: 'Awesome game',
    price: 30
  }),
  new Product ({
    imagePath: "/images/pexels-photo-1198817.jpeg",
    title: 'This is a wider card with supporting text',
    description: 'Awesome game',
    price: 40
  })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if(done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
