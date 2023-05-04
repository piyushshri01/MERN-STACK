const userModel = require("../model/userModel")

async function getUsers(req, res) {
    let allUsers = await userModel.find()
    res.json({
        message: "list of all users",
        data: allUsers
    })
}

function postUser(req, res){
    console.log(req.body);
    users = req.body
    res.json({
        message: "send data successfully",
        user:req.body
    })
}

async function updateUser(req, res){
    console.log("req.body =>",req.body);
    // update data in users obj
    let dataToBeUpdated = req.body
    let user = await userModel.findOneAndUpdate({email:"xyz@gmail.com"}, dataToBeUpdated)
    res.json({
        message: "data update succesfull",
        data: user
    })
}

async function deleteUser(req,res){
    let dataToBeDeleted = req.body
    let user = await userModel.findOneAndDelete(dataToBeDeleted)
    res.json({
        message:"delete data successfully",
        data:user
    })
}

async function getUserById(req, res){
    console.log(req.params.id);
    let paramId = req.params.id
    let allUsers = await userModel.find()
    let obj = {}
    for (let i = 0; i<allUsers.length; i++){
        if(allUsers[i]["id"] == paramId){
            obj = allUsers[i]
        }
    }
    res.json({
        messsage:"req received",
        data:obj
    })
}

function setCookies(req, res){
    // res.setHeader("Set-Cookie", "isLoggedIn = true")'
    // for security purpose
    res.cookie("isLoggedIn", true,{maxAge:1000*60*60*24,secure:true, httpOnly:true})
    res.cookie("isPrimeMember", true)

    res.send("cookies has been sent")

}

function getCookies(req, res){
    let cookies = req.cookies;
    console.log(cookies)
    res.send("cookies received")
}

module.exports = {getUsers, postUser, updateUser, deleteUser, getUserById, setCookies, getCookies}