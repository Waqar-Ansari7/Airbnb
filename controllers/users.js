const User=require("../models/user")
// signup


module.exports.signup=async (req, res) => {
    try {
         let { email, username, password } = req.body;
         const newUser = new User({ email, username });
         let registeredUser = await User.register(newUser, password);
         console.log(registeredUser);
        req.login(registeredUser,(err)=>{
         if(err){
              return next(err);
         }
         req.flash("success","Welcome to wanderlust");
         res.redirect("/listings");
        })
    } catch (error) {
         req.flash("err", error.message);
         res.redirect("/signup")
    }

}

// signup render

module.exports.signupRender=(req, res) => {
    res.render("users/signup.ejs");
}

// login render

module.exports.loginRender=(req, res) => {
    res.render("users/login.ejs");
}

// logout 

module.exports.logout=(req, res, next) => {
    req.logOut((err) => {
         if (err) {
              return next(err);
         }
         req.flash("success", "you logged out!");
         res.redirect("/listings");
    })
}