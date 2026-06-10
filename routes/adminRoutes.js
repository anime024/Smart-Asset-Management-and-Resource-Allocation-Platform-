const express=require('express')


const adminRouter=express.Router();

const {handleAdminDashboard,handleGetBookingsPage,handleApproveBooking,handleRejectBooking,handleIssueAsset,handleReturnAsset}=require('../controllers/adminController')
const {checkAuth}=require('../middlewares/checkAuth')
const {restrictTo}=require('../middlewares/restrictTo')


adminRouter.get('/dashboard',checkAuth,restrictTo(["admin"]),handleAdminDashboard);
adminRouter.get('/bookings',
    checkAuth,
    restrictTo(['admin']),
    handleGetBookingsPage
);

adminRouter.post('/bookings/approve/:id',
    checkAuth,
    restrictTo(['admin']),
    handleApproveBooking
);

adminRouter.post('/bookings/reject/:id',
    checkAuth,
    restrictTo(['admin']),
    handleRejectBooking
);

adminRouter.post("/bookings/issue/:id",restrictTo(["admin"]),handleIssueAsset);
adminRouter.post("/bookings/return/:id",restrictTo(["admin"]),handleReturnAsset);
module.exports={adminRouter}