const User = require("../models/userModel");
const errorHandler = require("../utils/error");
const Listing = require("../models/listingModel")
const bcryptjs = require('bcryptjs')
const userController = (req,res) => {
  res.send('hi , inside from the controller !');
}

const userInfoUpdate =async (req,res,next) => {
if(req.user.id !== req.params.id) return next(errorHandler(401,'you can not update this user!'))
  try {
    if(req.body.password){
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
    $set:{
      username: req.body.username,
      email:req.body.email,
      password:req.body.password,
      avatar:req.body.avatar,
    }
    },{new:true})

    const{password, ...others} =updatedUser._doc
    res.status(200).json(others)
  } catch (error) {
    next(error)
  }


  
}

const deleteUser = async(req,res,next)=>{
if(req.user.id !== req.params.id){
  return next(errorHandler(401,"you are not authorized to delete this account!"))
}
try {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.clearCookie('access_Token');
  res.clearCookie('access_token')
  res.status(200).json('account deleted successfully!')
  
} catch (error) {
  next(error)
}

}

const getUserListings = async(req,res,next)=>{
  if(req.user.id === req.params.id){
try {
  const listings  = await Listing.find({userRef:req.params.id})
res.status(201).json(listings);
} catch (error) {
  next(error)
}
  }
  else{
    return next( errorHandler(401, "you can only view your own listings!"));
  }
  

}

const getUser = async(req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
  if(!user){
    return next(errorHandler(404, "user not found!"))
  }
  const{password:pass, ...rest} = user._doc;
res.status(200).json(rest);
  } catch (error) {
    next(error)
  }
  
}

module.exports = {getUser,getUserListings,userController,userInfoUpdate,deleteUser};

