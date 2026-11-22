const jwt = require("jsonwebtoken")
async function authMiddleware(req,res,next) {
    try{
        const token = req.cookies?.token

        const decode = await jwt.verify(token,process.env.JWTSECRET)

        req.user = decode

        next();

    }catch(err){
        console.log("failed to get authenticate",err)
        return res.status(404).json({message : "failed to get authenticate"})
    }
}

module.exports = {authMiddleware}