const User = require('../models/userModel')
const bcryptjs  = require('bcryptjs');

const signup =async (req,res)=>{
const{username,  email, password}=req.body;
const  hashedPassword =bcryptjs.hashSync(password, 10);
console.log('yyyyyyyyyyyyyyyyyy',req.body);

const user = new User({username,email,password:hashedPassword});
await user.save();
console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',user)
res.status(201).json({message:"User created successfully"})

    
} 


module.exports= signup;