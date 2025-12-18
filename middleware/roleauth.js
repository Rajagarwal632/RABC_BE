function roleauth(allowedroles){
    return (req,res,next)=>{
        if(!allowedroles.includes(req.user.role)){
            return res.status(403).json({
                msg : "ACCESS DENIED"
            })
        }
        next()
    }
}
module.exports = {
    roleauth
}