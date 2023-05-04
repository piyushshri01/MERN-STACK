const express = require('express');
const authRouter = express.Router()
const protectRoute = require("./authHelper")
const {getSignUp, postSignUp, loginUser} = require("../controller/authController")

authRouter
.route("/signup")
.get(protectRoute, getSignUp)
.post(postSignUp)

authRouter
.route("/login")
.post(loginUser)


module.exports = authRouter