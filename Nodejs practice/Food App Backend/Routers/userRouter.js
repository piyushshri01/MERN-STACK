const express = require('express');
const userRouter = express.Router()
const {getUser, getAllUser, updateUser, deleteUser} = require("../controller/userController");
const {signup, login, isAuthorised, protectRoute, forgetpassword, resetpassword, logout} = require("../controller/authController")


// user option
userRouter
.route("/:id")
.patch(updateUser)
.delete(deleteUser)

userRouter
.route("/signup")
.post(signup)

userRouter
.route("/login")
.post(login)

userRouter
.route("/forgetpassword")
.post(forgetpassword)

userRouter
.route("/resetpassword/:token")
.post(resetpassword)

userRouter
.route("/logout")
.get(logout)

// profile page
userRouter.use(protectRoute)
userRouter
.route("/userProfile")
.get(getUser)

// admin specific function
userRouter.use(isAuthorised(['admin']))
userRouter
.route('/')
.get(getAllUser)


module.exports = userRouter