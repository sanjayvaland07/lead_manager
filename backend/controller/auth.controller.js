const {createUser,findUserByEmail} = require("../model/auth.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function registerUser(req,res){
    
    try{
        const {email,password} = req.body;

        const user = await findUserByEmail(email)
        if(user.length > 0) return res.status(401).json({message : "this user is already register"})

        const hashPassword = await bcrypt.hash(password,10);
        const result = await createUser(email,hashPassword)
        return res.status(200).json({message : "user register successfully"})
    }catch(error){
        console.log("failed to register user : ",error)
        return res.status(400).json({message : "failed to register user"})
    }
}

async function loginUser(req,res) {
    try{
        const {email,password} = req.body
        const [user] = await findUserByEmail(email)

        if(!user) return res.status(401).json({message : "invalid credentials"})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({message : "invalid credentials"})
        }

        const token = jwt.sign({id : user.id,email : user.email},process.env.JWTSECRET,{expiresIn : "1d"});
        
        res.cookie("token",token,{
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "lax",
            maxAge : 24 * 60 * 60 * 1000
        })
        return res.status(200).json({message : "login successfull"})
    }catch(error){
         console.log("failed to login user : ",error)
        return res.status(400).json({message : "failed to login user"})
    }
}

module.exports = {registerUser,loginUser}