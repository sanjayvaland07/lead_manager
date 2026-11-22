const {registerUser,loginUser} = require("../controller/auth.controller")
const express = require("express")
const authRouter = express.Router()

authRouter.get("/",(req,res)=>res.send("hello world"))
authRouter.post("/register",registerUser)
authRouter.post("/login",loginUser)

module.exports = {authRouter}