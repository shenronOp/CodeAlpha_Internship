// backend/routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort('-createdAt');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const p = new Product(req.body);
    const saved = await p.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
