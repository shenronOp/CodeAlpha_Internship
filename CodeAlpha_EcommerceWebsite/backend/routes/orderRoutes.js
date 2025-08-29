// backend/routes/orderRoutes.js
const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product').populate('user', 'name email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
