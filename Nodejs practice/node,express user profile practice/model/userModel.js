// mongoose
const mongoose = require("mongoose");
const emailValidator = require("email-validator");

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
    }
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

// model
const userModel = mongoose.model("userModel", userSchema)

module.exports = userModel