const express = require('express');
const planRouter = express.Router()
const {isAuthorised, protectRoute} = require("../controller/authController")
const {getAllPlans, getPlan, createPlan, updatePlan, deletePlan, top3Plan} = require("../controller/planController");


// plan option
planRouter
.route("/allPlans")
.get(getAllPlans)


planRouter.use(protectRoute)
planRouter
.route("/plan/:id")
.get(getPlan)

planRouter.use(isAuthorised(['admin','restaurantowner']))
planRouter
.route("/crudPlan")
.post(createPlan) 

planRouter
.route("/crudPlan/:id")
.patch(updatePlan)
.delete(deletePlan)

// top 3 plans
planRouter
.route("/top3plan")
.get(top3Plan)


module.exports = planRouter
