const mongoose = require('mongoose');



const users = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, require: true, unique: true },
        password: { type: String, required: true },
        role_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            required: true,
        }
    },
    { timestamps: true },
);




module.exports = mongoose.model('User', users);
