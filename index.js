const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app =express();




app.listen(3000,()=>{
   console.log('server is running on the port 3000') 
})


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log('connected to Database succesfully')
)
.catch((err)=>console.log('database connection error',err));
