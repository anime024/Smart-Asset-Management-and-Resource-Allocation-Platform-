const express=require('express')


const adminRouter=express.Router();

const {handleAdminDashboard}=require('../controllers/adminController')
const {checkAuth}=require('../middlewares/checkAuth')
const {restrictTo}=require('../middlewares/restrictTo')


adminRouter.get('/dashboard',checkAuth,restrictTo(["admin"]),handleAdminDashboard);

module.exports={adminRouter}