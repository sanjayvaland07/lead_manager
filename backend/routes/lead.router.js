const express = require("express")
const { addNewLead, fetchAllLeads, leadDelete } = require("../controller/lead.controller")
const leadRouter = express.Router()

leadRouter.get("/",(req,res)=>res.send("hello lead"))
leadRouter.post("/add",addNewLead)
leadRouter.get("/fetch",fetchAllLeads)
leadRouter.delete("/:leadId/delete",leadDelete)
leadRouter.patch("/:leadId/update",leadDelete)

module.exports = {leadRouter}

