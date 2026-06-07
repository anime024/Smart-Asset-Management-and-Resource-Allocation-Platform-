const express = require("express");

const {checkAuth}=require('../middlewares/checkAuth')
const {restrictTo}=require('../middlewares/restrictTo')


const router = express.Router();

const {
    handleGetAssets,
    handleGetCreateAsset,
    handlePostCreateAsset,
    handleGetEditAsset,
    handlePostEditAsset,
    handlePostDeleteAsset
} = require("../controllers/assetController");

router.get("/assets",checkAuth,handleGetAssets);

router.get("/assets/create",checkAuth,restrictTo(["admin"]),handleGetCreateAsset);
router.post("/assets/create",checkAuth,restrictTo(["admin"]),handlePostCreateAsset);

router.get("/assets/edit/:id",checkAuth,restrictTo(["admin"]),handleGetEditAsset);
router.post("/assets/edit/:id",checkAuth,restrictTo(["admin"]),handlePostEditAsset);

router.post("/assets/delete/:id",checkAuth,restrictTo(["admin"]),handlePostDeleteAsset);

module.exports = router;