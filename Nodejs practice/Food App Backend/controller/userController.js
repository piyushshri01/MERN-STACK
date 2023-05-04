const userModel = require("../model/userModel")

async function getAllUser(req, res) {
    let allUsers = await userModel.find()
    res.json({
        message: "list of all users",
        data: allUsers
    })
}

async function getUser(req, res){
    let paramId = req.id
    let user = await userModel.findById(paramId)
    if(user){
        res.json({
            messsage:"req received",
            data:user
        })
    }else{
        res.json({
            messsage:"user not registered",
        })
    }    
}

async function updateUser(req, res){
    try{
        let paramId = req.params.id
        let user = await userModel.findById(paramId)
        let dataToBeUpdated = req.body
        if(user){
            const keys = []
            for(let key in dataToBeUpdated){
                keys.push(key)
            }
            for(let i=0; i < keys.length; i++){
                user[keys[i]] = dataToBeUpdated[keys[i]]
            }
            // updated data save in DB
            const updatedData = await user.updateOne(user)
            // or
            // await user.save()
            res.json({
                message: "data updated successfully",
                data: user
            })
        }else{
            res.json({
                message: "user not found"
            })
        }
    } catch(err){
        res.json({
            message: err.message
        })
    }
    
}

async function deleteUser(req,res){
    try{
        let paramId = req.params.id
        let user = await userModel.findByIdAndDelete(paramId)
        // res.clearCookie('login');
        if(user){
            res.json({
                message: "delete data successfully",
                data: user
            })
        }else{
            res.json({
                message: "user not found"
            })
        }
    }catch(err){
        res.json({
            message: err.message
        })
    }   
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

module.exports = {getUser, getAllUser, updateUser, deleteUser, setCookies, getCookies}
