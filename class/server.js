const express=require("express");
const app=express();
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");
// Session express for storing and info

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const sessioninfo={
    secret:"mysupersecretstring",
    resave: false,
    saveUninitialized:true,
}

app.use(session(sessioninfo));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.msg=req.flash("success")
    res.locals.err=req.flash("error")
    next();
})

app.get("/register",(req,res)=>{
    let {name="anonmyous"}=req.query;
   req.session.name=name;
   if(name==="anonmyous"){
    req.flash("error", "user not register!");
   }else{
    req.flash("success", "user registered successfully!");
   }
    res. redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name: req.session.name});
 })


// app.use(session({secret: "mysupersecretstring",saveUninitialized:true,resave:false}));

// app.get("/count",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`You search for session ${req.session.count} times`);
// });

// app.get("/test",(req,res)=>{
//     res.send("Test suucessful!");
// });

app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
});