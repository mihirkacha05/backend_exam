const express = require('express')
const ticket = require('../models/tickets')
const ticket_comments = require('../models/ticket_comments')
const { default: mongoose } = require('mongoose')

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const router = express.Router()

router.post('/post', async (req, res) => {
    try {
        const { title, description , status ,priority,created_by,assigned_to } = req.body;
        const tickets = await ticket.create({
            title, 
            description , 
            status ,
            priority,
            created_by,
            assigned_to
        })
        res.json({ msg: "ticket created", tickets })
    }
    catch (err) {
        res.json(err);
    }
})

router.get('/get', async (req, res) => {
    try {
        const tickets = await ticket.find().populate('created_by', 'name').populate('assigned_to','name');
        if (tickets.length === 0) {
            res.json({ msg: "empty databse" })
        }
        res.json({ msg: "all tickets feched", tickets })
    } catch (err) {
        res.json(err);
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const tickets = await ticket.findByIdAndDelete(req.params.id)
        if (!tickets) {
            res.json({ msg: "ticket is not  in database" })
        }
        res.json({ msg: "deleted ticket", tickets })
    }
    catch (err) {
        res.json(err)
    }
})

router.post('/:id/comments', async (req, res) => {

    const ticket_id = req.params.id;
    try {
        const { user_id, comment } = req.body;
        const ticket_comment = await ticket_comments.create({
            ticket_id,
            user_id,
            comment
        })
        res.json({ msg: "comment created", ticket_comment })
    }
    catch (err) {
        res.json(err);
    }
})

router.get('/:id/comments', async (req, res) => {
  try {
    const ticket_id  = req.params.id;
    console.log(ticket_id);

    if (!isValidId(ticket_id)) {
      return res.status(400).json({ msg: 'invalid ticket id' });
    }

    const commentOfTicket = await ticket_comments.find({ ticket_id }).populate('ticket_id','title description status priority').populate('user_id','name')
    res.status(200).json({
      msg: 'comment fetched for ticket',
      count: commentOfTicket.length,
      commentOfTicket,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id/assign', async (req, res) => {
  try {
    const { id } = req.params;


    const updatedTicket = await ticket.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!updatedTicket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    res.status(200).json({ msg: 'Ticket updated', Ticket: updatedTicket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;


    const updatedTicket = await ticket.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!updatedTicket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }

    res.status(200).json({ msg: 'status updated', Ticket: updatedTicket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






module.exports = router;