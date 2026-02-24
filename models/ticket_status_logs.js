const mongoose = require('mongoose');



const ticket_status_logs = new mongoose.Schema(
    {


        ticket_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ticket',
            required: true,
        },
        
        old_status: {
            type: String,
            enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED','CLOSED'],
            default: 'OPEN',
        },

        new_status: {
            type: String,
            enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED','CLOSED'],
            default: 'OPEN',
        },


        changed_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

    },
    { timestamps: true },
);




module.exports = mongoose.model('ticket_status_log', ticket_status_logs);
