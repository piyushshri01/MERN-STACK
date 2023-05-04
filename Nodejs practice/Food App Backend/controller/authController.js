const userModel = require("../model/userModel")
const jwt = require('jsonwebtoken');
const JWT_KEY = require("../secrets")


async function signup(req, res){
    try{
        let dataObj = req.body;
        let user = await userModel.create(dataObj)
        if(user){
            res.json({
                message: "user signed up",
                data: user
            })
        }else{
            res.json({
                message: "error while sign in"
            })
        }   
    }catch(err){
        res.json({
            message: err.message
        })
    }  
}

async function login(req, res){
    try{
        let data = req.body
        if(data.email){
            let user = await userModel.findOne({email:data.email})
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

// isAuthprised => to check users role
function isAuthorised(roles){
    return function(req,res,next){
        // req.role = "admin"
        if(roles.includes(req.role)==true){
            next()
        }else{
            res.status(401).json({
                message: "operation not allowed"
            })
        }
    }
}

async function protectRoute(req, res,next){
    try{
        let token;
        if(req.cookies.login){
            token = req.cookies.login
            let payload = jwt.verify(token, JWT_KEY)
            if(payload){
                const user = await userModel.findById(payload.payload)
                req.role = user.role;
                req.id = user.id;
                next()
            }else{
                return res.json({
                    message: "user not verified !"
                })
            }
        }else{
            // if request is from browser:
            const client = req.get('User-Agent')
            if(client.includes("Mozilla")==true){
                return res.redirect('/login')
            }else{
                return res.json({
                    message: "please log in !"
                })
            }    
        }
    }catch(err){
        return res.json({
            message: err.message
        })
    }  
}

async function forgetpassword(req, res){
    let {emailf} = req.body;
    try{
        const user = await userModel.findOne({email:emailf})
        if (user){
            // createResetToken is used to create a new token
            const resetToken = user.createResetToken()
            // http://xyz.com/resetpassword/resettoken
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            // send email to the user
            // by nodemailer
        }else{
            return res.json({
                message:"user not registered..."
            })
        }

    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
    
}

async function resetpassword(req, res){
    const token = req.params.token;
    let {password, confirmPassword} = req.body;
    try{
        const user = await userModel.findOne({resetToken:token})
        if(user){
            // resetPasswordHandler will update user password in db 
            user.resetPasswordHandler(password, confirmPassword)
            await user.save()
            res.json({
                message:"password changed successfully please login...."
            })
        }else{
            return res.json({
                message:"user not found"
            })
        }
    }catch(err){
        return res.json({
            message:err.message
        })
    }
}

// logout function
function logout(req, res){
    res.cookie('login',' ',{maxAge:1})
    res.json({
        message:"logout successfully"
    })
}

module.exports = {signup, login, isAuthorised, protectRoute, forgetpassword, resetpassword, logout}