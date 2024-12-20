const Listing=require("./models/listing")
const Review=require("./models/review")
module.exports.isLoggedIn=((req,res,next)=>{
     if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be login first")
        res.redirect("/login");
      }else{
        next();
      }
})

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
  let { id } = req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currentUser._id)){
      req.flash("error","You do not have permission to perform this action because you are not the owner of this listing!")
      return  res.redirect(`/listings/${id}`);
    }
    next();
}
 
module.exports.isReviewOwner=async(req,res,next)=>{
  let { id,reviewId } = req.params;
    let review=await Review.findById(reviewId);
    if(!review.owner.equals(res.locals.currentUser._id)){
      req.flash("error","You do not have permission to perform this action because you are not the owner of this listing!")
      return  res.redirect(`/listings/${id}`);
    }
    next();
}
 
 