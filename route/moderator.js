const { Router } = require("express")
const mongoose = require("mongoose")

const modroute = Router()

const { userauth } = require("../middleware/userauth")
const { roleauth } = require("../middleware/roleauth")

modroute.get("/mod_admin_test" , userauth , roleauth(["admin", "moderator"]),function(req,res){
    res.json({
        msg : "WELCOME ADMIN//MODERATOR"
    })
})
modroute.get("/mod_test" , userauth , roleauth(["moderator"]),function(req,res){
    res.json({
        msg : "WELCOME MODERATOR"
    })
})
module.exports = {
    modroute
}