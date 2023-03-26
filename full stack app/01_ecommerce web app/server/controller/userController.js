const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")

const signUp = async(req,res)=>{
    // extract data from request body
    // const name = req.body.name;
    // const image = req.file;
    const {name, email, password} = req.body
    // Email
    const userImage=req.file
    console.log(userImage)
    try{
        const user = await userModel.findOne({
          email: email
        });
      if (user) {
        return res.status(400).json({
          message: "Failed! Email is already in use!"
        });
      }else{
        const newUser = new userModel(req.body)
        await newUser.save()
        const id = newUser._id
        const token = jwt.sign({email,id}, process.env.SECRET_KEY)
        return res.status(200).json({
            message: "user registered successfully !!",
            newUser,
            token
        });
      }

    } catch (error) {
      return res.status(500).json({
        message: "Unable to validate Username!"
      });
    }
  };


const signIn = async(req,res)=>{
    // extract data from request body
    const { email, password } = req.body
    // Email
    try{
        const user = await userModel.findOne({
          email: email
        });
        console.log(user)

      if (!user) {
        return res.status(400).json({
          message: "User does not exist"
        });
      }else{
        if (user.password !== password){
            return res.status(400).json({
                message: "password does not matched!"
              });
        }
        const id = user._id
        const token = jwt.sign({email,id}, process.env.SECRET_KEY)
        return res.status(200).json({
            message: "user logged in successfully !!",
            token
        });
      }

    } catch (error) {
      return res.status(500).json({
        message: "Unable to validate user!!"
      });
    }

}

module.exports = {signUp, signIn}