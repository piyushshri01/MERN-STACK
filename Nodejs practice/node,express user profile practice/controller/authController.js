const userModel = require("../model/userModel")
const jwt = require('jsonwebtoken');
const JWT_KEY = require("../secrets")

function getSignUp(req,res){
    res.sendFile('/view/index.html', {root: __dirname})
}

async function postSignUp(req, res){
    let dataObj = req.body;
    let user = await userModel.create(dataObj)
    res.json({
        message: "user signed up",
        data: user
    })
}

async function loginUser(req, res){
    try{
        let data = req.body
        let user = await userModel.findOne({email:data.email})
        if(data.email){
            if(user){
                if(user.password == data.password){
                    let uid = user['_id'] // uid
                    let jsonWebtoken = jwt.sign({payload:uid},JWT_KEY)
                    res.cookie("login", jsonWebtoken ,{httpOnly:true})
                    return res.json({
                        message: "user has logged in",
                        data: data
                    })
    
                }else{
                    return res.json({
                        message:"password is incorrect !"
                    })
                }
            }else{
                return res.json({
                    message:"user not found !"
                })
            }
        }   
    }
    catch(err){
        return res.json({
            message:err
        })
    }

}

module.exports = {getSignUp, postSignUp, loginUser}