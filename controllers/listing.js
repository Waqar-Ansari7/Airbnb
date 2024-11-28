const Listing=require("../models/listing")
const validateListing=require("../middleware")
// for index 
module.exports.index= async(req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }

//   new listing

module.exports.newListing= (req, res) => {
    res.render("listings/new.ejs");
}

// Show listing

module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
      path:"reviews",
      populate: {
        path:"author",
      },
    }).populate("owner");
    if(!listing){
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    }else{
      res.render("listings/show.ejs", { listing})
    }
  }

//   create new route

module.exports.createNewRoute=async (req, res, next) => {
  const filename=req.file.filename
    const url=req.file.path
    // console.log(url,"..",filename)
    const Newlistings = new Listing(req.body.listing)
    Newlistings.owner=req.user._id;
    Newlistings.image={filename,url};
    await Newlistings.save();
    req.flash("success","New listing created!")
    res.redirect("/listings")
  
  }

//   Edit route

module.exports.editListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you requested for does not exist!")
      res.redirect("/listings");
    }else{
      res.render("listings/edit.ejs", { listing });
    }
  }

//   update route

module.exports.updateListing=async (req, res) => {
    let { id } = req.params
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
   if(typeof req.file !=="undefined"){
    const filename=req.file.filename
    const url=req.file.path
    listing.image={filename,url};
   await listing.save();
  }
    req.flash("success","Listing updated")

    res.redirect(`/listings/${id}`);
  }

//   Destroy -> Delete route

module.exports.deleteListing=async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing deleted !")

    res.redirect("/listings");
  }