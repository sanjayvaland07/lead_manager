const {pool} = require("../config/db")
const {v4 : uuidv4} = require("uuid")

async function createUser(email,hassPassword){
    const userid = uuidv4().replace(/-/g,'')
    const [result] = await pool.execute(
        `insert into users(id,email,password) values(?,?,?)`,
        [userid,email,hassPassword]
    );

    return result
}

async function findUserByEmail(email){
    const [result] = await pool.execute(`select * from users where email=?`,[email])
    return result;
}

module.exports = {createUser,findUserByEmail}