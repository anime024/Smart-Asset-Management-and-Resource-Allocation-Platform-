const { Booking } = require("../models/booking");

async function handleUserDashboard(req, res) {
  let message = req.params.msg || null;
  const bookings = await Booking.find({
    user: req.session.user._id,
  })
    .populate("asset")
    .sort({ createdAt: -1 });

  return res.render("user/dashboard", { message, bookings });
}

function handleUserLogout(req, res) {
  req.session.destroy(function (err) {
    if (err) return res.json({ message: "PROBLEM IN LOGOUT " });
  });

  return res.redirect("/?msg=Log Out Succesfull");
}

async function handleGetHistory(req,res){

    const bookings=await Booking.find({
        user:req.session.user._id
    }).populate("asset");

    res.render("user/history",{
        bookings
    });
}

module.exports = { handleUserDashboard, handleUserLogout,handleGetHistory };
