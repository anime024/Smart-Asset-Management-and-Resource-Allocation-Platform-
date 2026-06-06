const express = require("express");

const {
  handleHomePage,
  handleGetLogin,
  handleGetSignup,
  handlePostLogin,
  handlePostSignup,
} = require("../controllers/authController");

const authRouter = express.Router();

authRouter.get("/", handleHomePage);
authRouter.get("/login", handleGetLogin);
authRouter.get("/signup", handleGetSignup);
authRouter.post("/login", handlePostLogin);
authRouter.post("/signup", handlePostSignup);

module.exports = { authRouter };
