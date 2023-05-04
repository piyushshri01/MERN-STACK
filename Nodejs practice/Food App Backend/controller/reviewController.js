const reviewModel = require("../model/reviewModel");
const planModel = require("../model/planModel");

async function getAllReview(req, res){
    try{
        let reviews = await reviewModel.find()
        if(reviews){
            return res.json({
                message:"all reviews",
                allReview : reviews
            })
        }else{
            return res.json({
                message:"reviews not found..."
            })
        }  
    }catch(err){
        return res.json({
            message: err.message
        })
    }
}

async function top3Review(req, res){
    try{
        let topthreereview = await reviewModel.find().sort({rating:-1}).limit(3)
        return res.json({
            message:"top 3 review",
            topthreereview
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
    
}

async function getPlanReview(req, res){
    try{
        let planid = req.params.id;
        let reviews = await reviewModel.find()
        let filterViews = reviews.filter(review=> review.plan._id == planid)
        if(filterViews.length > 0){
            return res.json({
                message:"plan reviews",
                filterViews
            })
        }else{
            return res.json({
                message:"reviews not found..."
            })
        }
    }catch(err){
        return res.json({
            message: err.message
        })
    }
}

async function createReview(req, res){
    try{
        let id = req.params.plan;
        let plan = await planModel.findById(id);
        let data = req.body
        let createReview = await reviewModel.create(data)
        plan.ratingsAverage = ((plan.ratingsAverage)+(data.rating))/2
        await plan.save()
        return res.json({
            message:"review created successfully",
            review: createReview
        })
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }   
}

async function updateReview(req, res){
    try{
        let id = req.params.id;
        let review = await reviewModel.findById(id)
        if(review){
            let dataToBeUpdated = req.body;
            keys = []
            for(let key in dataToBeUpdated){
                keys.push(key)
            }
            for(let i = 0; i< keys.length;i++){
                review[keys[i]] = dataToBeUpdated[keys[i]]
            }
            await review.save()
            return res.json({
                message: "review updated successfully",
                review
            })
        }else{
            return res.json({
                message: "review not found"
            })
        }
    }catch(err){
        return res.json({
            message:err.message
        })
    }  
}

async function deleteReview(req, res){
    try{
        let id = req.params.id;
        let review = await reviewModel.findByIdAndDelete(id);
        if(review){
            return res.json({
                message:"review delete successfully",
                review
            })
        }else{
            return res.json({
                message:"review not found....",
            }) 
        }
    }catch(err){
        return res.json({
            message: err.message
        })
    }
}

module.exports = {getAllReview, getPlanReview, createReview, top3Review, updateReview, deleteReview}