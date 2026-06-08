const {Asset}=require("../models/asset")
const {Booking}=require("../models/booking")


async function handlePostCreateBooking(req,res)
{
    const assetId=req.params.id;
    const {quantity}=req.body;

    const asset=await Asset.findById(assetId);

    if(!asset)
    {
        return res.redirect("/assets");
    }

    const qty=Number(quantity);

    if(qty<=0)
    {
        return res.redirect(`/assets/${assetId}`);
    }


    if(qty>asset.availableQuantity)
    {
        return res.redirect(
            `/assets/${assetId}?msg=Not enough quantity`
        );
    }

    await Booking.create({
        asset:asset._id,
        user:req.session.user._id,
        quantity:qty
    });

    return res.redirect(
        `/${req.session.user.role}/dashboard?msg=Request Sent`
    );
}


async function handleGetCreateBooking(req,res) {
    const asset=await Asset.findById(req.params.id);

    if(!asset)
    {
        return res.redirect("/assets");
    }

    return res.render("asset/assetDetails",{asset});
}


module.exports={handlePostCreateBooking,handleGetCreateBooking}