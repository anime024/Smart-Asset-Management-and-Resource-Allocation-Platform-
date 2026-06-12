const { Asset } = require("../models/asset");
const {Booking}=require("../models/booking");
const {User}=require('../models/user')
const mongoose=require("mongoose")


async function handleAdminDashboard(req,res){

    const totalAssets = await Asset.countDocuments();

    const totalUsers = await User.countDocuments({
        role:"user"
    });

    const pendingRequests = await Booking.countDocuments({
        status:"pending"
    });

    const activeAllocations = await Booking.countDocuments({
        status:"issued"
    });

    const overdueBookings = await Booking.find({
        status:"issued",
        endDate:{ $lt:new Date() }
    }).populate("user asset");

    const mostUsedAssets = await Booking.aggregate([
    {
        $group:{
            _id:"$asset",
            count:{ $sum:1 }
        }
    },
    {
        $sort:{ count:-1 }
    },
    {
        $limit:5
    }
]);
await Asset.populate(mostUsedAssets,{
    path:"_id"
});

const categoryData = await Asset.aggregate([
{
    $group:{
        _id:"$category",
        count:{ $sum:1 }
    }
}
]);

    res.render("admin/dashboard",{
        totalAssets,
        totalUsers,
        pendingRequests,
        activeAllocations,
        overdueBookings,
        mostUsedAssets,
        categoryData
    });
}
async function handleGetBookingsPage(req,res){

     const bookings = await Booking.find()
        .populate("user")
        .populate("asset")
        .sort({ createdAt: -1 });
        

    res.render("admin/bookings",{
        bookings
    });
}

async function handleApproveBooking(req,res){
    const bookingId=req.params.id;
    const session=await mongoose.startSession();

    try{
        await session.withTransaction(async()=>{
            const booking=await Booking.findById(bookingId).session(session);

            if(!booking){
                throw new Error('Booking not found ');
            }

            if(booking.status!=="pending"){
                throw new Error('Booking already processed ');
            }

            const asset=await Asset.findById(booking.asset).session(session);

            if(!asset){
                throw new Error('Asset not found ');
            }

            if(asset.availableQuantity<booking.quantity){
                throw new Error('Not enough quantity available ');
            }

            asset.availableQuantity-=booking.quantity;

            booking.status='approved';

            await asset.save({session});
            await booking.save({session});

        })

        return res.redirect('/admin/bookings');
    }catch(err){
        console.log(err);
        return res.send(err.message);
    }finally{
        await session.endSession();
    }
}

async function handleRejectBooking(req,res){

    const booking = await Booking.findById(req.params.id);

    if(!booking){
        return res.send('Booking not found');
    }

    if(booking.status !== 'pending'){
        return res.send('Booking already processed');
    }

    booking.status = 'rejected';

    await booking.save();

    return res.redirect('/admin/bookings');
}



async function handleIssueAsset(req,res){

    const bookingId=req.params.id;

    const booking=await Booking.findById(bookingId);

    if(!booking){
        return res.send("Booking not found");
    }

    if(booking.status!=="approved"){
        return res.send("Only approved bookings can be issued");
    }

    booking.status="issued";

    await booking.save();

    res.redirect("/admin/bookings");
}

async function handleReturnAsset(req,res){

    const bookingId=req.params.id;

    const booking=await Booking.findById(bookingId);

    if(!booking){
        return res.send("Booking not found");
    }

    if(booking.status!=="issued"){
        return res.send("Only issued assets can be returned");
    }

    const asset=await Asset.findById(booking.asset);

    asset.availableQuantity += booking.quantity;

    await asset.save();

    booking.status="returned";

    await booking.save();

    res.redirect("/admin/bookings");
}

module.exports={handleAdminDashboard,handleGetBookingsPage,handleApproveBooking,handleRejectBooking,handleIssueAsset,handleReturnAsset}