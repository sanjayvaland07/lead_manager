const {pool} = require("../config/db")
const {v4 : uuidv4} = require("uuid")

async function createLead(user_id,username,email,phone,company,source,status) {
    const leadId = uuidv4().replace(/-/g,'');
    const [result] = await pool.execute(
        `insert into leads(id,user_id,username,email,phone,company,source,status)
        values(?,?,?,?,?,?,?,?)`,
        [leadId,user_id,username,email,phone,company,source,status]
    )

    return result
}

async function findAllLead(user_id) {
    const [result] = await pool.execute(`select * from leads where user_id=?`,[user_id]);
    return result
}

async function deleteLead(leadId) {
    const [result] = await pool.execute(`delete from leads where id=?`,[leadId]);
    return result
}

async function updateLead(leadId,username,email,phone,company,source,status) {
    const [result] = await pool.execute(
        `update leads set username=?, email=?, phone=?, company=?, source=?, status=? where id=?`,
        [username,email,phone,company,source,status,leadId]
    )
    return result
}

module.exports = {createLead,findAllLead,deleteLead,updateLead}