// mongoose
const mongoose = require("mongoose");

// connect mongoDB
const db_link = "mongodb+srv://admin:6RGBCSsnOpelfugd@cluster0.livb2vc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log("plan DB connected");
})
.catch(function(err){
    console.log(err);
})

const planSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:[20,"plan name should not exceed more than 20 character"]
    },
    duration:{
        type:Number,
        required:true,

    },
    price:{
        type:Number,
        required:[true,'price not entered'],
    },
    ratingsAverage:{
        type:Number
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount < 100
        }, 'discount should not exceed price']
    }
})


// model
const planModel = mongoose.model("planModel", planSchema)

module.exports = planModel
