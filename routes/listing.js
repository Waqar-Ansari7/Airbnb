const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const expressError = require("../utils/expressError.js")
const { listingSchema} = require("../schema.js")
const Listing = require("../models/listing.js");
const{isOwner}=require("../middleware.js");
const { isLoggedIn} = require("../middleware.js");
const{isReviewOwner}=require("../middleware.js");

// for controller


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
      let errMsg=error.details.map((el)=> el.message).join(",");
      throw new expressError(400, errMsg);
    } else {
      next();
    }
  };

  const listingController=require("../controllers/listing.js");
  const multer  = require('multer')     //form k data ko parse kernay k liye use hota h
  const {storage}=require("../cloudConfig.js")
const upload = multer({storage})  //form k data say file  ko nikalay ga or  osko folder m store kerta h

  // Index route  & create route

  router.route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createNewRoute));

  // New route

  router.get("/new", isLoggedIn,listingController.newListing)

  
  //  Show route , Update route ,  Delete route

  router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
  .delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing))
  
  
  // Edit route
  
  router.get("/:id/edit",isLoggedIn,wrapAsync(listingController.editListing));
  
  module.exports=router;
  