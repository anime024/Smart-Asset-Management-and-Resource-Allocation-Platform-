const { Asset } = require("../models/asset");
const {Booking}=require("../models/booking")
const mongoose=require("mongoose")


function handleAdminDashboard(req,res){
    let message=req.params.msg||null;
    const user=req.session.user;
    console.log("user ",user)
    return res.render('admin/dashboard',{message,user})
}

async function handleGetBookingsPage(req,res){

     const bookings = await Booking.find()
        .populate("user")
        .populate("asset");

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