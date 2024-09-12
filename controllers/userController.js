const User = require("../models/userModel");
const errorHandler = require("../utils/error");

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

module.exports = {userController,userInfoUpdate};

