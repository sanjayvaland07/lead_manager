const { createLead, updateLead, findAllLead, deleteLead } = require("../model/lead.model")

async function addNewLead(req,res){
    try{
        const {username,email,phone,company,source,status} = req.body
        if(!req.user?.id) return res.status(400).json({message : "failed to add new lead"})

        const result = await createLead(req.user.id,username,email,phone,company,source,status)

        return res.status(200).json({message : "lead save successfully"})
    }catch(err){
        console.log("failed to add new lead ",err)
        return res.status(400).json({message : "failed to add new lead"})
    }
}

async function fetchAllLeads(req,res){
    try{
        if(!req.user?.id) return res.status(400).json({message : "failed fetch lead"})
        const result = await findAllLead(req.user?.id)
        return res.status(200).json({message : "lead find successfully",leads : result})
    }catch(err){
        console.log("failed to add new lead ",err)
        return res.status(400).json({message : "failed to fetch lead"})
    }
}

async function leadUpdate(req,res){
    try{
        const {username,email,phone,company,source,status} = req.body
        const leadId = req.params.leadId
        if(!leadId)  return res.status(400).json({message : "failed to delete lead"})
        const result = await updateLead(leadId,username,email,phone,company,source,status)
        return res.status(200).json({message : "lead update successfully"})
    }catch(err){
        console.log("failed to add new lead ",err)
        return res.status(400).json({message : "failed to add new lead"})
    }
}

async function leadDelete(req,res){
    try{
        const leadId = req.params.leadId;
        if(!leadId)  return res.status(400).json({message : "failed to delete lead"})

        const result = await deleteLead(leadId)

        return res.status(200).json({message : "lead delete successfully"})
    }catch(err){
        console.log("failed to add new lead ",err)
        return res.status(400).json({message : "failed to delete lead"})
    }
}

module.exports = {addNewLead,leadUpdate,fetchAllLeads,leadDelete}