const mongoose = require('mongoose');



const ticket_comments = new mongoose.Schema(
    {

        ticket_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ticket',
            required: true,
        },

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
         
        comment: { type: String, required: true },


    },
    { timestamps: true },
);




module.exports = mongoose.model('ticket_comment', ticket_comments);
