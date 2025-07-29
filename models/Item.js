const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true    
    },
    date: {
        type: Date,
        default: Date.now
    },
    // NEW FIELD: Add a 'completed' field
    completed: {
        type: Boolean,
        default: false // Items are not completed by default
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);