///---LOAD MIDDLEWARES--------///
const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    }
    /* email: {
        type:String,
        required:false
    } */
});

const ClientData = mongoose.model('Client',ClientSchema);
module.exports = ClientData;
