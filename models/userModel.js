const mongoose = require('mongoose');




const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,  // unique username

    },
    email: {
        type: String,
        required: true,
        unique: true ,  // This will ensure that no two users can have the same email


    },
    password: {
        type: String,
        required: true,
        },
        

},
{timestamps : true})


const User  = mongoose.model('User', userSchema);

module.exports =User;