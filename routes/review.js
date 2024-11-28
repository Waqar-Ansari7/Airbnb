const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js")
const expressError = require("../utils/expressError.js")
const {reviewSchema } = require("../schema.js")
const Listing = require("../models/listing.js")
const Review = require("../models/review.js")
const {isLoggedIn,isOwner}=require("../middleware.js")

// controller

const reviewController=require("../controllers/review.js")


const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
      let errMsg=error.details.map((el)=> el.message).join(",");
      throw new expressError(400, errMsg);
    } else {
      next();
    }
  };

  // Review route => post route

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));
  
  // Delete Review route
  
  router.delete("/:reviewId",isLoggedIn,isOwner,wrapAsync(reviewController.destroyReview));

  module.exports=router;

  // isOwner