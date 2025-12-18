const jwt = require("jsonwebtoken")
const JWT_USER = process.env.JWT_USER

function userauth(req,res,next){
    const token = req.headers.token
    if(!token){
        return res.status(401).json({
            msg : "TOKEN MISSING"
        })
    }
    try{
        const decodeddata = jwt.verify(token,JWT_USER)
        req.userid = decodeddata
        next()
        
    }
    catch(error){
        res.status(401).json({
            msg : "INCORRECT CREDENTIALS"
        })
    }   
}
module.exports = {
    userauth
}