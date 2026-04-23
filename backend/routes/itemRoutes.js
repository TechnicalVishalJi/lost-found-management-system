const express = require('express');
const router = express.Router();
const { addItem, getItems, getItemById, updateItem, deleteItem, searchItems } = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');

router.get('/items/search', searchItems);
router.post('/items', protect, addItem);
router.get('/items', getItems);
router.get('/items/:id', getItemById);
router.put('/items/:id', protect, updateItem);
router.delete('/items/:id', protect, deleteItem);

module.exports = router;
