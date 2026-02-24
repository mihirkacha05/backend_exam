const express = require('express')
const ticket_status_logs = require('../models/tickets')

const router = express.Router()

router.post('/post', async (req, res) => {
    try {
        const { ticket_id, old_status , new_status ,changed_by} = req.body;
        const ticket_status_log = await ticket_status_logs.create({
            ticket_id, 
            old_status , 
            new_status ,
            changed_by
        })
        res.json({ msg: "ticket_status_log created", ticket_status_log })
    }
    catch (err) {
        res.json(err);
    }
})

module.exports = router;