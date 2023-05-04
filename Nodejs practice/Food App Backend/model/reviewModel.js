// mongoose
const mongoose = require("mongoose");

// connect mongoDB
const db_link = "mongodb+srv://admin:6RGBCSsnOpelfugd@cluster0.livb2vc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log("preview DB connected");
})
.catch(function(err){
    console.log(err);
})

const reviewSchema = mongoose.Schema({
    review:{
        type:String,
        required:[true,'review is required']
    },
    rating:{
        type:Number,
        min: 1,
        max: 10,
        required:[true,'rating is required']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"userModel",
        required:[true,'review must belong to a user']
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:"planModel",
        required:[true,'review must belong to a plan']
    },
})

// pre hook for selected items form user and plan model
reviewSchema.pre(/^find/, function(next){
    this.populate({
        path:"user",
        select:"name profileImage"
    }).populate("plan");
    next()
})


// model
const reviewModel = mongoose.model("reviewModel", reviewSchema)

module.exports = reviewModel
