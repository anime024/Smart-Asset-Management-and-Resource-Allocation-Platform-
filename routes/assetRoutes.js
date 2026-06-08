const express = require("express");

const {checkAuth}=require('../middlewares/checkAuth')
const {restrictTo}=require('../middlewares/restrictTo')


const assetRouter = express.Router();

const {
    handleGetAssets,
    handleGetCreateAsset,
    handlePostCreateAsset,
    handleGetEditAsset,
    handlePostEditAsset,
    handlePostDeleteAsset,
    handleGetSingleAsset
} = require("../controllers/assetController");


assetRouter.get("/assets/create",checkAuth,restrictTo(["admin"]),handleGetCreateAsset);
assetRouter.post("/assets/create",checkAuth,restrictTo(["admin"]),handlePostCreateAsset);

assetRouter.get("/assets/edit/:id",checkAuth,restrictTo(["admin"]),handleGetEditAsset);
assetRouter.post("/assets/edit/:id",checkAuth,restrictTo(["admin"]),handlePostEditAsset);

assetRouter.post("/assets/delete/:id",checkAuth,restrictTo(["admin"]),handlePostDeleteAsset);
assetRouter.get('/assets/:id',checkAuth,handleGetSingleAsset);
assetRouter.get("/assets",checkAuth,handleGetAssets);
module.exports = {assetRouter};