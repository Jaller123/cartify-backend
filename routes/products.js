const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')

const products = [
  {
    id: 1,
    title: 'Modern Sofa',
    price: 499.99,
    image: 'http://localhost:5000/images/sofa.jpeg'
  },
  {
    id: 2,
    title: 'Wooden Dining Table',
    price: 299.99,
    image: 'http://localhost:5000/images/table.jpg'
  },
  {
    id: 3,
    title: 'Wooden Kitchen Chair',
    price: 99.99,
    image: 'http://localhost:5000/images/chair.jpg'
  },
  {
    id: 4,
    title: 'Tribal Pattern Carpet',
    price: 49.99,
    image: 'http://localhost:5000/images/carpet.jpg'
  },
  {
    id: 5,
    title: 'Modern Styled Lamp',
    price: 79.99,
    image: 'http://localhost:5000/images/lamp.jpg'
  },
  {
    id: 6,
    title: 'Humidifier',
    price: 99.99,
    image: 'http://localhost:5000/images/humi.jpg'
  },
  {
    id: 7,
    title: 'Modern Lamp',
    price: 89.99,
    image: 'http://localhost:5000/images/lamp.jpg'
  },
  {
    id: 8,
    title: 'Living Room Table',
    price: 99.99,
    image: 'http://localhost:5000/images/roomtable.jpg'
  }
];

  router.get('/', auth, (req, res) => {
    res.json(products);
  });

  router.get('/:id', (req, res) =>{
    const product = products.find(
      (p) => p.id === parseInt(req.params.id, 10)
    )
    if (product) {
      res.json(product);
    } else {
      res.status(404).send({  message: 'Products not found'})
    }
  });

  

  module.exports = router;
  
