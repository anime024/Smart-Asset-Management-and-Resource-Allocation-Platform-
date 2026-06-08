const express=require("express");
const {checkAuth}=require('../middlewares/checkAuth')
const {restrictTo}=require('../middlewares/restrictTo')
const {handlePostCreateBooking,handleGetCreateBooking}=require('../controllers/bookingController')
const bookingRouter=express.Router();

bookingRouter.get('/create/:id',checkAuth,handleGetCreateBooking)
bookingRouter.post("/create/:id",checkAuth,handlePostCreateBooking);

module.exports={bookingRouter};