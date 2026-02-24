const express = require('express')
const Role = require('../models/roles');

const router = express.Router()

router.post('/post', async (req, res) => {
    try {
        const { id, role } = req.body;
        const roleadded = await Role.create({
            id,
            role
        })
        res.json({ msg: "role created", roleadded })
    }
    catch (err) {
        res.json(err);
    }
})


module.exports = router;