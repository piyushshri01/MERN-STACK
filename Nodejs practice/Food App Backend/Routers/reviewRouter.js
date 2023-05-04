const express = require('express');
const { append } = require('vary');
const reviewRouter = express.Router()
const {isAuthorised, protectRoute} = require("../controller/authController")
const {getAllReview, getPlanReview, createReview, top3Review, updateReview, deleteReview} = require("../controller/reviewController");


// plan option
reviewRouter
.route("/all")
.get(getAllReview)

reviewRouter
.route("/top3")
.get(top3Review)

reviewRouter
.route("/:id")
.get(getPlanReview)

reviewRouter.use(protectRoute)
reviewRouter
.route("/crud/:plan")
.post(createReview)

reviewRouter
.route("/crud/:id")
.patch(updateReview)
.delete(deleteReview)


module.exports = reviewRouter