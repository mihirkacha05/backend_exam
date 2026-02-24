const JWT = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const headers = req.headers.authorization;

    if(!headers){
        return res.json({msg:"token in header is missing"})
    }

    const  token = headers.split(' ')[1];

    try{
          JWT.verify(token,process.env.secret)
          next();
    }catch(err){
        res.json({msg:"token invalid ",err:err.message})
    }

}

module.exports = verifyToken;

