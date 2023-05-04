const jwt = require('jsonwebtoken');
const JWT_KEY = require("../secrets")


function protectRoute(req, res, next){
    if(req.cookies.login){
        let isVerified = jwt.verify(req.cookies.login, JWT_KEY)
        if(isVerified){
            next()
        }else{
            return res.json({
                message: "user not verified !"
            })
        }
    }else{
        return res.json({
            message: "please log in !"
        })
    }
}

module.exports = protectRoute