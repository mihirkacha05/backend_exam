const express = require('express')
const bcrypt = require('bcryptjs');
const User = require('../models/users')
const JWT = require('jsonwebtoken');


const router = express.Router()

const createToken = (id) => {
    const token = JWT.sign({ id }, process.env.secret, { expiresIn: '3h' });
    return token;
};


router.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ msg: "user not registered" })
        }

        const isvalid = await bcrypt.compare(password, user.password)

        if (!isvalid) {
            return res.json({ msg: "invalid password" })
        }

        const token = createToken(user._id);
        return res.json({ msg: "loged in ", token })
    }
    catch (err) {
        return res.json(err.message);
    }
})


module.exports = router;