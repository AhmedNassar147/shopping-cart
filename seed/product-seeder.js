var Product = require('../models/product-schema');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping');
var products = [
  new Product({
    imgUrl: '/images/1.jpeg',
    title: 'Product 1',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, voluptatum culpa et provident corporis cupiditate quo amet quae sint in eveniet itaque sed neque iure.',
    price: 10
  }),
  new Product({
    imgUrl: '/images/2.jpeg',
    title: 'Product 2',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, voluptatum culpa et provident corporis cupiditate quo amet quae sint in eveniet itaque sed neque iure.',
    price: 12
  }),
  new Product({
    imgUrl: '/images/3.jpg',
    title: 'Product 3',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, voluptatum culpa et provident corporis cupiditate quo amet quae sint in eveniet itaque sed neque iure.',
    price: 10
  }),
  new Product({
    imgUrl: '/images/4.jpg',
    title: 'Product 4',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, voluptatum culpa et provident corporis cupiditate quo amet quae sint in eveniet itaque sed neque iure.',
    price: 10
  }),
  new Product({
    imgUrl: '/images/5.jpg',
    title: 'Product 5',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, voluptatum culpa et provident corporis cupiditate quo amet quae sint in eveniet itaque sed neque iure.',
    price: 10
  }),
  new Product({
    imgUrl: '/images/6.jpeg',
    title: 'Product 6',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, voluptatum culpa et provident corporis cupiditate quo amet quae sint in eveniet itaque sed neque iure.',
    price: 12
  }),
  new Product({
    imgUrl: '/images/7.jpg',
    title: 'Product 7',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, voluptatum culpa et provident corporis cupiditate quo amet quae sint in eveniet itaque sed neque iure.',
    price: 10
  }),
];

var done = 0;
for (var i = 0; i < products.length; i++) {
   products[i].save(function(err, result){
     done++;
     if (done === products.length) {
      exit();
     }
   });
};
function exit(){
  mongoose.disconnect();
}