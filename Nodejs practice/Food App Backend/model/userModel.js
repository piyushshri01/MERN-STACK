// mongoose
const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const crypto = require("crypto");


// connect mongoDB
const db_link = "mongodb+srv://admin:6RGBCSsnOpelfugd@cluster0.livb2vc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log("DB connected");
})
.catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,    
        validate:function(){
            return emailValidator.validate(this.email)
        }
    },
    password:{
        type:String,
        required: true,
        minLength: 8
    },
    confirmPassword:{
        type:String,
        required: true,
        minLength: 8,
        validate:function(){
            return this.password==this.confirmPassword
        } 
    },
    role:{
        type: String,
        enum:['admin','user','restaurantowner','deliveryboy'],
        default:'user'
    },
    profileImage: {
        type:String,
        default:'../view/img/users/default.jpeg'
    },
    resetToken:String
})

// hooks exp
userSchema.pre("save", async function(){
    // we donn't want to save data of confirm password
    this.confirmPassword = undefined;
})

// userSchema.pre("save", async function(){
//     // password security
//     let salt = await bcrypt.genSalt()
//     let hashedString = await bcrypt.hash(this.password,salt)
//     this.password = hashedString;
// })

// userSchema.post("save", async function(doc){
//     console.log("after saving in db");
// })

userSchema.methods.createResetToken = function(){
    // for getting unique 32 bit token in hexadecimal by crypto
    // crypto npm package
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.resetToken = resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler = function(password, confirmPassword){
    // for getting unique 32 bit token in hexadecimal by crypto
    // crypto npm package
    this.password = password;
    this.confirmPassword = confirmPassword
    this.resetToken = undefined
}

// model
const userModel = mongoose.model("userModel", userSchema)

module.exports = userModel