const {Router} = require("express")
const mongoose = require("mongoose")
const { z } = require("zod")
const userroute = Router()
const bcrypt = require("bcrypt")
const saltround = 10
const {usermodel} = require("../config/db")

const jwt = require("jsonwebtoken")
const JWT_USER = process.env.JWT_USER

userroute.post("/signup" , async function(req,res){
    const reqbody = z.object({
        email : z.string().email(),
        password  : z.string(),
        name : z.string()
    })
    const parse = reqbody.safeParse(req.body)
    if(!parse.success){
        res.json({
            msg : "INCORRECT FORMAT",
            error : parse.error
        })
    }
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const hashpassword = await bcrypt.hash(password,saltround)
    await usermodel.create({
        email,
        password : hashpassword,
        name
    })
    res.json({
        msg : "USER CREATED"
    })
})
module.exports={
    userroute
}