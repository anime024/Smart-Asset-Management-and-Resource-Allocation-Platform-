const express = require("express");
const {checkAuth}=require('../middlewares/checkAuth')

const {
  handleHomePage,
  handleGetLogin,
  handleGetSignup,
  handlePostLogin,
  handlePostSignup,
  handleUserLogout
} = require("../controllers/authController");

const authRouter = express.Router();

authRouter.get("/", handleHomePage);
authRouter.get("/login", handleGetLogin);
authRouter.get("/signup", handleGetSignup);
authRouter.post("/login", handlePostLogin);
authRouter.post("/signup", handlePostSignup);
authRouter.get('/logout',checkAuth,handleUserLogout)

module.exports = { authRouter };
