const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc GET ALL Items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// @route Post api/items
// @desc Create An Item
// @access Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// @route   PUT api/items/:id
// @desc    Update An Item (e.g., toggle completed status)
// @access  Private 
router.put('/:id', auth, (req, res) => {
    const { name, completed } = req.body;

    // Build update object
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (completed !== undefined) updateFields.completed = completed;

    Item.findByIdAndUpdate(
        req.params.id,
        { $set: updateFields },
        { new: true }
    )
    .then(item => {
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        res.json(item);
    })
    .catch(err => res.status(400).json({ msg: 'Failed to update item', error: err }));
});

// @route DELETE api/items/:id
// @desc DELETE An Item
// @access Private
router.delete('/:id', auth, (req, res) => {
    Item.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false, error: err.message }));
});

module.exports = router;