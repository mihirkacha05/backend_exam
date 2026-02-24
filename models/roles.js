const mongoose = require('mongoose');


const roles = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true, },
        role: {
            type: String,
            enum: ['MANAGER', 'SUPPORT', 'USER'],
            default: 'USER',
        },
    },
);


module.exports = mongoose.model('Role', roles);
