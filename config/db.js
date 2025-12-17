const mongoose = require("mongoose")

const Schema = mongoose.Schema
const objectid = Schema.ObjectId

mongoose.connect(process.env.MONGO_URL)

const user = new Schema({
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    name : {type : String , required : true},
    role : {type : String , default : "user" , enum : ["user" , "admin" , "moderator"]} 
})

const usermodel = mongoose.model("user" , user)
module.exports = { 
    usermodel
}