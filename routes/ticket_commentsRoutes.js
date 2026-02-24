const express = require('express')
const ticket_comments = require('../models/ticket_comments')

const router = express.Router()



router.delete('/delete/:id', async (req, res) => {
    try {
        const ticket_comment = await ticket_comments.findByIdAndDelete(req.params.id)
        if (!ticket_comment) {
            res.json({ msg: "ticket_comment is not  in database" })
        }
        res.json({ msg: "deleted ticket_comment", ticket_comment })
    }
    catch (err) {
        res.json(err)
    }
})


router.patch('/patch/:id', async (req, res) => {
    try {
        const {...setdata } = req.body;
        const ticket_comment = await ticket_comments.findByIdAndUpdate(
            req.params.id,setdata
        )
        if (!ticket_comment) {
            res.json({ msg: "ticket_comment is not  in database" })
        }
        res.json({ msg: "updated ticket_comment", ticket_comment })
    }
    catch (err) {
        res.json(err)
    }
})


module.exports = router;