const User = require('../models/userModel')
const bcryptjs  = require('bcryptjs');
const errorHandler = require('../utils/error.js');

const signup =async (req,res,next)=>{
const{username,  email, password}=req.body;
const  hashedPassword =bcryptjs.hashSync(password, 10);
console.log('yyyyyyyyyyyyyyyyyy',req.body);


const user = new User({username,email,password:hashedPassword});

try {
    await user.save();
console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',user)
res.status(201).json({message:"User created successfully"})
} catch (error) {
//    next(error);
    next(errorHandler(550,`you are getting the error from error util, error:${error} `));
}


    
} 


module.exports= signup;