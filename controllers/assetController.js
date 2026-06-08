const {Asset} = require("../models/asset");

async function handleGetAssets(req,res){

    const { search, category } = req.query;

    let filter = {};

    if(search){
        filter.name = {
            $regex:search,
            $options:"i"
        };
    }

    if(category){
        filter.category = category;
    }

    const assets = await Asset.find(filter);

    res.render("asset/assets",{
        assets
    });
}


async function handleGetSingleAsset(req,res) {

    const asset=await Asset.findById(req.params.id);
    
    if(!assset){
        return res.redirect('/assets?msg=no asset found');
    }

    console.log("assset is ",asset)

    return res.render("asset/singleAsset",{asset});



}

async function handleGetSingleAsset(req,res){
    const asset=await Asset.findById(req.params.id);

    if(!asset)
    {
        return res.redirect('/assets?msg=no asset found ')
    }

    return res.render("asset/assetDetails",{asset});
}




function handleGetCreateAsset(req,res){
    res.render("asset/createAsset");
}

async function handlePostCreateAsset(req,res){

    const {
        name,
        category,
        description,
        totalQuantity,
        availableQuantity,
        status
    } = req.body;

    await Asset.create({
        name,
        category,
        description,
        totalQuantity,
        availableQuantity,
        status
    });

    res.redirect("/assets");
}

async function handleGetEditAsset(req,res){

    const asset = await Asset.findById(req.params.id);

    if(!asset){
        return res.redirect("/assets");
    }

    res.render("asset/editAsset",{
        asset
    });
}

async function handlePostEditAsset(req,res){

    let status = "Available";

    console.log(`req.body is ${req.body}`);


    const {
        name,
        category,
        description,
        totalQuantity,
        availableQuantity,
    } = req.body;

    if(availableQuantity === 0){
    status = "Out of Stock";
}
else if(availableQuantity <= 3){
    status = "Limited";
}

const asset=await Asset.findById(req.params.id)
console.log(asset);
    await Asset.findByIdAndUpdate(
        req.params.id,
        {
            name,
            category,
            description,
            totalQuantity,
            availableQuantity,
            status
        }
    );

    res.redirect("/assets");
}

async function handlePostDeleteAsset(req,res){

    await Asset.findByIdAndDelete(req.params.id);

    res.redirect("/assets");
}

module.exports = {
    handleGetAssets,
    handleGetCreateAsset,
    handlePostCreateAsset,
    handleGetEditAsset,
    handlePostEditAsset,
    handlePostDeleteAsset,
    handleGetSingleAsset
};