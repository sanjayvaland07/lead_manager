require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const {connectDB} = require("./config/db")
const {authRouter} = require("./routes/auth.router")
const { leadRouter } = require("./routes/lead.router")
const { authMiddleware } = require("./middleware/auth.middleware")


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended : true}))

app.use("/api",authRouter)
app.use("/api/lead",authMiddleware,leadRouter)

const startServer = async()=>{
    try{
        await connectDB()
        app.listen(3000,()=>console.log("server started on http//localhost:3000"))
    }catch(error){
        console.log("failed to start the server : ",error)
    }
}

startServer();