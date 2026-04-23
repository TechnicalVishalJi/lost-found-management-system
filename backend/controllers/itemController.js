const Item = require('../models/Item');

const addItem = async (req, res) => {
    try {
        const { ItemName, Description, Type, Location, Date, ContactInfo } = req.body;
        const newItem = new Item({
            ItemName,
            Description,
            Type,
            Location,
            Date,
            ContactInfo,
            user: req.user.id
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ message: 'Server error adding item' });
    }
};

const getItems = async (req, res) => {
    try {
        const items = await Item.find().populate('user', 'Name');
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error picking items' });
    }
};

const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateItem = async (req, res) => {
    try {
        let item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (item.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to update this item' });
        }

        item = await Item.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (item.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this item' });
        }

        await item.deleteOne();
        res.json({ message: 'Item removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const searchItems = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            const items = await Item.find().populate('user', 'Name');
            return res.json(items);
        }
        
        const items = await Item.find({ ItemName: { $regex: name, $options: 'i' } }).populate('user', 'Name');
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error during search' });
    }
};

module.exports = { addItem, getItems, getItemById, updateItem, deleteItem, searchItems };
