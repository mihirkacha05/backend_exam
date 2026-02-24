const mongoose = require('mongoose');



const tickets = new mongoose.Schema(
    {
        title: {
            type: String,
            minLength: [5, 'title must be at least 5 characters long.'],
            required: true
        },

        description: {
            type: String,
            required: true,
            minLength: [10, 'description must be at least 10 characters long.']
        },

        status: {
            type: String,
            enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
            default: 'OPEN',
        },

        priority: {
            type: String,
            enum: ['LOW', 'MEDIUM', 'HIGH'],
            default: 'LOW',
        },

        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        assigned_to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },

    },
    { timestamps: true },
);




module.exports = mongoose.model('ticket', tickets);
