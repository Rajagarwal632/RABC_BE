const { Router } = require("express")
const mongoose = require("mongoose")

const adminroute = Router()

const { usermodel } = require("../config/db")
const { userauth } = require("../middleware/userauth")
const { roleauth } = require("../middleware/roleauth")

adminroute.get("/" , userauth , roleauth(["admin"]),function(req,res){
    res.json({
        msg : "WELCOME ADMIN"
    })
})

adminroute.patch("/assign-role/:id",userauth,roleauth(["admin"]),async function(req,res){
    const role = req.body.role
    const userid = req.params.id

    const validroles = ["admin" , "user" , "moderator"]
    if(!validroles.includes(role)){
        return res.status(400).json({
            msg : "INVALID ROLE"
        })
    }
    const user = await usermodel.findOneAndUpdate({
        _id : userid
    },{
        role : role,
    },{
        new : true
    })
    if(!user){
        return res.status(404).json({
            msg : "USER NOT FOUND"
        })
    }
    res.json({
        msg : "ROLE UPDATED",
        userid : user._id,
        newrole : role
    })
})

module.exports = {
    adminroute
}
