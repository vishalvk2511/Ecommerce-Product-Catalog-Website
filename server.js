const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/productCatalog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
});

// Create a product model
const Product = mongoose.model('Product', productSchema);

app.use(cors());
app.use(bodyParser.json());

// Get products with optional search and filter
app.get('/products', async (req, res) => {
  const { search, category } = req.query;
  const query = {};

  if (search) {
    query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
  }

  if (category) {
    query.category = category;
  }

  const products = await Product.find(query);
  res.json(products);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
