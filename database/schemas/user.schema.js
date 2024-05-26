const mongoose = require('mongoose');
const mongooseConnectionInstance = require('../mongoose.config');


const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    log:{
        type:[{
            description:String,
            duration:Number,
            date:Date,
        }]
    }
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel