///---LOAD MIDDLEWARES--------///
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    // tag_id:{
    //     type:int,
    //     required:true
    // },
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    create_date: {
        type:Date,
        default:Date.now
    }
});

const User = mongoose.model('User',UserSchema);
module.exports = User;
