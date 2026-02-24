const express = require('express')


const router = express.Router()


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

        const token = createToken(user._id, user.email);
        return res.json({ msg: "loged in ", token })
    }
    catch (err) {
        return res.json(err.message);
    }
})
