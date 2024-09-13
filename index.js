const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoute.js')
const authRouter = require('./routes/authRoute.js');
const cookieParser = require('cookie-parser');
dotenv.config();
const app =express();
app.use(express.json());


app.use(cookieParser())

app.listen(9000,()=>{
   console.log('server is running on the port 9000') 
})


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log('connected to Database succesfully')
)
.catch((err)=>console.log('database connection error',err));


app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode  || 500;
    const message = err.message  || 'Internal Server Error';
return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
})

})

