const express=require('express')

const userRouter=express.Router();

const {checkAuth}=require('../middlewares/checkAuth')
const {restrictTo}=require('../middlewares/restrictTo')

const {handleUserDashboard,handleUserLogout}=require('../controllers/userController')

userRouter.get('/dashboard',checkAuth,restrictTo(["user"]),handleUserDashboard);
userRouter.get('/logout',checkAuth,handleUserLogout)


module.exports={userRouter}
