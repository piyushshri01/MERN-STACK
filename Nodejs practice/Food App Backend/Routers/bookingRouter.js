const express = require('express');
const bookingRouter = express.Router()
const {protectRoute} = require("../controller/authController")
const {createSession} = require("../controller/bookingController");

// bookingRouter.use(protectRoute)
bookingRouter
.route("/createSession")
.get(function(req, res){
    try{
        res.sendFile('booking.html', { root:(__dirname+ '../../view') })
                
    }catch(err){
        res.json({
            message:err.message
        })
    }
    
})
.post(createSession)


module.exports = bookingRouter