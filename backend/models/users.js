const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const user_schema = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    }
})

const UserModel = mongoose.model('users',user_schema);
module.exports = UserModel;