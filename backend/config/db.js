const mysql = require("mysql2/promise")


const pool = mysql.createPool({
    host : process.env.HOST,
    user : process.env.USER,
    database : process.env.DATABASE,
    password : process.env.PASSWORD,
    port : Number(process.env.PORT || 3306)
})

const connectDB = async ()=>{
    try{
        const connection = await pool.getConnection()

        console.log("database connection successfully")

        connection.release()
    }catch(error){
        console.log("failed to connect db ",error)
    }
}

module.exports = {pool,connectDB}