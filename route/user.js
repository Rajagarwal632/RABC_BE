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
userroute.post("/signin" , async function(req,res){
    const email = req.body.email
    const password = req.body.password
    const existuser = await usermodel.findOne({
        email
    })
    if(!existuser){
        return res.status(404).json({
            msg : "USER NOT EXIST"
        })
    }
    const match = await bcrypt.compare(password,existuser.password)
    if(match){
        const token = jwt.sign({
            userid : existuser._id
        },JWT_USER)
        res.json({
            token
        })
    }else{
        res.json({
            msg : "INCORRECT PASSWORD"
        })
    }
})

module.exports={
    userroute
}