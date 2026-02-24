const express = require('express')
const User = require('../models/users')
const bcrypt = require('bcryptjs');

const router = express.Router()

router.post('/post', async (req, res) => {
    try {
        const { name, email, password, role_id } = req.body;
        const hashpass = await bcrypt.hash(password, 11)
        const user = await User.create({
            name,
            email,
            password: hashpass,
            role_id
        })
        res.json({ msg: "user created", user })
    }
    catch (err) {
        res.json(err);
    }
})



router.patch('/patch/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        const hashpass = await bcrypt.hash(password, 11)


        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { password: hashpass } }, 
            { new: true, runValidators: true } 
        );
        if (!updatedUser) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }

        res.status(200).json({ msg: 'status updated', Ticket: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/get', async (req, res) => {
    try {
        const users = await User.find().populate('role_id', 'role');
        if (users.length === 0) {
            res.json({ msg: "empty databse" })
        }
        res.json({ msg: "all user feched", users })
    } catch (err) {
        res.json(err);
    }
})

module.exports = router;