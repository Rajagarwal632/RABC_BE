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

module.exports = {
    adminroute
}
