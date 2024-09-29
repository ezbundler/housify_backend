const Listing = require("../models/listingModel.js");
const errorHandler = require("../utils/error.js");

const createListing = async(req,res,next)=>{
 try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
 } catch (error) {
    next(error);
 }
}

const deleteListing = async(req,res,next)=>{
   const listing = await Listing.findById(req.params.id);
   if(!listing) {
      return next(errorHandler(404, 'listing not found'))
   }
if(req.user.id !== listing.userRef){
   return next(errorHandler(401,'You can only Delete your own listings!'));
}

try {
   await Listing.findByIdAndDelete(req.params.id);
   res.status(201).json("Listing deleted succesfully!")
} catch (error) {
   next(error);
}

}

const updateListing = async(req,res,next)=>{
   const listing = await Listing.findById(req.params.id);
   if(!listing){
      return next(errorHandler(404,"Listing Not Found!"))
   }
   if(req.user.id  !== listing.userRef){
      return next(errorHandler(401,'You can only update your own listings!'));

   }

   try {
      const updatedListing = await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true})
      res.status(200).json(updatedListing);
   } catch (error) {
      next(error);
   }
}

const fetchListing = async(req,res,next)=>{
   
   try {
   const listing = await Listing.findById(req.params.id) 
   
  if(!listing){
   return next(errorHandler(404,"Listing Not Found!"))
  } 

   res.status(200).json(listing);
   } catch (error) {
      next(error);
   }
}
module.exports = {createListing,deleteListing,updateListing,fetchListing};