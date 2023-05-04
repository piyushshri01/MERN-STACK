const planModel = require("../model/planModel")

async function getAllPlans(req, res){
    try{
        let allPlan = await planModel.find()
        if(allPlan){
            return res.json({
                message: "all plans",
                data:allPlan
            })
        }else{
            return res.json({
                message: "plan not found"
            })
        }
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }  
}

async function getPlan(req, res){
    try{
        let id = req.params.id;
        let plan = await planModel.findById(id)
        if(plan){
            return res.json({
                message: "plan reterived",
                data:plan
            })
        }else{
            return res.json({
                message: "plan not found"
            })
        }
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }    
}

async function createPlan(req, res){
    try{
        let planData = req.body;
        let createdPlan = await planModel.create(planData)
        return res.json({
            message:"plan created successfully",
            plan: createdPlan
        })
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

async function updatePlan(req, res){
    try{
        let paramId = req.params.id;
        let plan = await planModel.findById(paramId);
        let dataToBeUpdated = req.body;
        if(plan){
            let keys = []
            for(let key in dataToBeUpdated){
                keys.push(key)
            }
            for(let i = 0; i < keys.length; i++){
                plan[keys[i]] = dataToBeUpdated[keys[i]]
            }

            // update plan
            // const updateData = await planModel.updateOne(plan)
            await plan.save()
            return res.json({
                message:"plan updated successfully",
                plan
            })
        } else{
            return res.json({
                message:"plan does not exist"
            })
        }
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

async function deletePlan(req, res){
    try{
        let id = req.params.id;
        let plan = await planModel.findByIdAndDelete(id)
        if(plan){
            return res.json({
                message:"plan deleted successfully",
                plan
            })
        } else{
            return res.json({
                message:"plan does not exist"
            })
        }
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

async function top3Plan(req, res){
    try{
        let topthreeplan = await planModel.find().sort({ratingsAverage:-1}).limit(3)
        return res.json({
            message:"top 3 plan",
            topthreeplan
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }    
}

module.exports = {getAllPlans, getPlan, createPlan, updatePlan, deletePlan, top3Plan}