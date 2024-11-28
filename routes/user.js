const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/users.js");

// signup

router.route("/signup")
.get(userController.signupRender)
.post(wrapAsync(userController.signup));

// login

router.route("/login")
.get(userController.loginRender)
.post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res) => {
     req.flash("success", "Welcome back to Wanderlust");
     let redirect=res.locals.redirectUrl || "/listings";
     res.redirect(redirect);
});

router.get("/logout", userController.logout)
module.exports = router 