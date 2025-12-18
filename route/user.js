const { Router } = require("express")
const mongoose = require("mongoose")
const { z } = require("zod")
const userroute = Router()
const bcrypt = require("bcrypt")
const saltround = 10
const { usermodel } = require("../config/db")

const jwt = require("jsonwebtoken")
const JWT_USER = process.env.JWT_USER

userroute.post("/signup", async function (req, res) {
    try {

        const reqbody = z.object({
            email: z.string().email(),
            password: z.string(),
            name: z.string()
        })
        const parse = reqbody.safeParse(req.body)
        if (!parse.success) {
            return res.status(401).json({
                msg: "INCORRECT FORMAT",
                error: parse.error
            })
        }
        const email = req.body.email
        const password = req.body.password
        const name = req.body.name
        const hashpassword = await bcrypt.hash(password, saltround)
        const existUser = await usermodel.findOne({ email })
        if (existUser) {
            return res.status(409).json({
                msg: "USER ALREADY EXISTS"
            })
        }

        await usermodel.create({
            email,
            password: hashpassword,
            name
        })
        res.json({
            msg: "USER CREATED"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "SERVER ERROR"
        })
    }
})
userroute.post("/signin", async function (req, res) {
    const email = req.body.email
    const password = req.body.password
    try {
        const existuser = await usermodel.findOne({
            email
        })
        if (!existuser) {
            return res.status(404).json({
                msg: "USER NOT EXIST"
            })
        }
        const match = await bcrypt.compare(password, existuser.password)
        if (match) {
            const token = jwt.sign({
                userid: existuser._id,
                role : existuser.role
            }, JWT_USER)
            res.json({
                token
            })
        } else {
            res.status(401).json({
                msg: "INCORRECT PASSWORD"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "SERVER ERROR"
        })
    }
})

module.exports = {
    userroute
}