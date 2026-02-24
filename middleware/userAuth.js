const JWT = require('jsonwebtoken')
const User = require('../models/users')

const userAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate('role_id','role');
    if (user.role_id.role !== 'USER') {
      return res.json({ message: "access denied" });
    }
    next();
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = userAuth;

