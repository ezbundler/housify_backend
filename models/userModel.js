const mongoose = require('mongoose');




const userSchema = new mongoose.Schema({
    username: {
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
        avatar:{
            type:String,
            default:'https://imgs.search.brave.com/fGqj7ILdZHF7nTx8lgSM-Ow8eZhf7BNwnge4l60XaBE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by91/c2VyLXByb2ZpbGUt/aWNvbi1mcm9udC1z/aWRlXzE4NzI5OS0z/OTU5Ni5qcGc_c2l6/ZT02MjYmZXh0PWpw/Zw'

        },
        

},
{timestamps : true})


const User  = mongoose.model('User', userSchema);

module.exports =User;