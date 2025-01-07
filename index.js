const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());


// ID, NAME, Country, Brand, Ingredients, Skin Type, Skin Concerns, Price, Link 
// Mock Database
const products = [
    { 
      id: 1, 
      name: 'Korean Beauty of Josean Toner', 
      country: 'Korean', 
      brand: 'Anua', 
      type: 'Toner',
      ingredients: ['Niacinamide'], 
      skin_type: ['Oily', 'Dry'], 
      skin_concerns: ['Acne', 'Hyperpigmentation'], 
      price: 25, 
      link: 'https://www.sephora.sg/products/fresh-soy-face-cleanser/v/400ml' 
    },
    { 
      id: 2, 
      name: 'Japanese Sunscreen', 
      country: 'Japanese', 
      brand: 'Biore', 
      type: 'Sunscreen',
      ingredients: ['Hyaluronic Acid'], 
      skin_type: ['Oily', 'Dry'],
      skin_concerns: ['Sun Damage'],
      price: 18, 
      link: 'https://www.sephora.sg/products/shiseido-ultimate-sun-protector-lotion-spf-50/v/150ml' 
    },
    { 
      id: 3, 
      name: 'French Moisturizer', 
      country: 'French', 
      brand: 'La Roche-Posay', 
      type: 'Moisturizer',
      ingredients: ['Ceramides', 'Niacinamide'], 
      skin_type: ['Sensitive'], 
      skin_concerns: ['Redness', 'Dryness'], 
      price: 35, 
      link: 'https://www.sephora.sg/products/la-roche-posay-toleriane-sensitive-cream/v/40ml' 
    },
  ];

// Routes
// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Get product by ID
app.get('/products/id/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Get product by name
// http://localhost:8080/products/name/Korean%20Toner
app.get('/products/name/:name', (req, res) => {
  const searchTerms = req.params.name.split(' ');
  const product = products.filter((p) => searchTerms.every((term) => p.name.includes(term)));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Get product by type
app.get('/products/type/:type', (req, res) => {
  const product = products.find((p) => p.type === req.params.type);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Get product by skin type
app.get('/products/skin_type/:skin_type', (req, res) => {
  const product = products.filter((p) => p.skin_type.includes(req.params.skin_type));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Get product by ingredient
app.get('/products/ingredients/:ingredient', (req, res) => {
  const product = products.filter((p) => p.ingredients.includes(req.params.ingredient));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Get product by brand
app.get('/products/brand/:brand', (req, res) => {
  const product = products.find((p) => p.brand === req.params.brand);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Get product by skin concern
app.get('/products/skin_concerns/:skin_concern', (req, res) => {
  const product = products.filter((p) => p.skin_concerns.includes(req.params.skin_concern));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Get product by price
// http://localhost:8080/products/price?min=0&max=30
app.get('/products/price', (req, res) => {
  const min = parseFloat(req.query.min);
  const max = parseFloat(req.query.max);
  const product = products.filter((p) => p.price <= max && p.price >= min);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Create a new product
app.post('/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    details: req.body.details,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Delete a product
app.delete('/products/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index !== -1) {
    products.splice(index, 1);
    res.json({ message: 'Product deleted' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});


app.listen(
    PORT, 
    () => console.log('its alive on ${PORT}')
)
